"use server"

import { CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    
    // Log schema information for debugging
    console.log('Order schema paths:', Object.keys(Order.schema.paths));
    
    // Log the incoming order data for debugging
    console.log('Creating order with data:', {
      whatsappNumber: order.whatsappNumber,
      totalAmount: order.totalAmount,
      eventId: order.eventId,
      buyerName: order.buyerName,
      buyerNumber: order.buyerNumber,
      buyerEmail: order.buyerEmail,
      createdAt: order.createdAt
    });
    
    // Check if event exists
    const Event = (await import('@/lib/database/models/event.model')).default;
    const eventExists = await Event.findById(order.eventId);
    if (!eventExists) {
      throw new Error('Event not found');
    }
    
    // Create the order object explicitly to avoid any schema conflicts
    const orderData = {
      whatsappNumber: order.whatsappNumber,
      totalAmount: order.totalAmount,
      event: order.eventId,
      buyer: {
        name: order.buyerName,
        number: order.buyerNumber,
        email: order.buyerEmail
      },
      items: [], // Initialize with empty items array
      status: 'pending',
      createdAt: order.createdAt
    };
    
    console.log('Final order data being sent to DB:', orderData);
    
    const newOrder = await Order.create(orderData);

    console.log('Order created successfully:', newOrder._id);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.error('Error creating order:', error);
    handleError(error);
  }
}

export const updateOrder = async ({ orderId, updateData, path }: { orderId: string; updateData: Partial<Omit<CreateOrderParams, 'createdAt'>>; path: string }) => {
  try {
    await connectToDatabase();

    const orderToUpdate = await Order.findById(orderId);
    
    if (!orderToUpdate) {
      throw new Error('Order not found');
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { ...updateData },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')
    const eventObjectId = new ObjectId(eventId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDER BY ID
export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase();
    
    const order = await Order.findById(orderId)
      .populate({
        path: 'event',
        model: 'Event',
        populate: {
          path: 'organizer',
          model: 'User',
          select: '_id firstName lastName'
        }
      });

    if (!order) throw new Error('Order not found');

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('event._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}