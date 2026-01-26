import { Document, Schema, model, models, Types } from "mongoose";

export interface IOrderItem {
  _id: Types.ObjectId;
  event: {
    _id: Types.ObjectId;
    title: string;
    price: string;
    imageUrl: string;
  };
  quantity: number;
  totalPrice: number;
}

export interface IOrder extends Document<Types.ObjectId> {
  _id: Types.ObjectId;
  createdAt: Date;
  whatsappNumber: string;
  totalAmount: number;
  event: Types.ObjectId;
  buyer: { 
    name: string;
    number: string;
    email: string;
  };
  items: IOrderItem[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
}

const OrderItemSchema = new Schema({
  event: {
    _id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  quantity: { type: Number, required: true, default: 1 },
  totalPrice: { type: Number, required: true }
});

const OrderSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  whatsappNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  buyer: new Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true }
  }, { _id: false }),
  items: [OrderItemSchema],
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  }
}, { timestamps: true });

// Clear existing model if it exists to force schema refresh
if (models.Order) {
  delete models.Order;
}

const Order = model('Order', OrderSchema);

export default Order;