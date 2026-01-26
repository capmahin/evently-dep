"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { orderFormSchema } from "@/lib/validator";
import * as z from "zod";
import { orderDefaultValues } from "@/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";

type OrderFormProps = {
  userId: string;
  type: "Create" | "Update";
  order?: IOrder;
  orderId?: string;
};

const OrderForm = ({ userId, type, order, orderId, eventId }: OrderFormProps & { eventId?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Map the order object to match the form schema
  const initialValues =
    order && type === "Update"
      ? {
          whatsappNumber: order.whatsappNumber,
          totalAmount: order.totalAmount.toString(), // Convert number to string for form
          eventId: order.event.toString(), // Convert ObjectId to string
          buyerName: order.buyer.name,
          buyerNumber: order.buyer.number,
          buyerEmail: order.buyer.email,
          status: order.status,
          createdAt: new Date(order.createdAt).toISOString().split('T')[0], // Format date for input
        }
      : {
          ...orderDefaultValues,
          eventId: eventId || orderDefaultValues.eventId,
        };
  
  const router = useRouter();

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: initialValues
  });

  async function onSubmit(values: z.infer<typeof orderFormSchema>) {
    setIsLoading(true);

    if (type === "Create") {
      try {
        const newOrder = await createOrder({
          whatsappNumber: values.whatsappNumber,
          eventId: values.eventId,
          buyerName: values.buyerName,
          buyerNumber: values.buyerNumber,
          buyerEmail: values.buyerEmail,
          totalAmount: parseFloat(values.totalAmount) || 0, // Convert string to number
          createdAt: new Date(values.createdAt),
        });

        if (newOrder) {
          form.reset();
          router.push(`/orders/${newOrder._id}`);
        }
      } catch (error) {
        console.error('Error creating order:', error);
        // Show error message to user
        alert('Failed to create order. Please check the console for details.');
      } finally {
        setIsLoading(false);
      }
    }
    
    // Note: Update functionality would need the updateOrder function to be properly implemented
    // with the correct parameters
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>WhatsApp Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter WhatsApp Number"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Total Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter total amount"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="eventId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Event ID"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-5 w-full">
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Buyer Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="buyerNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Buyer Number"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="buyerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Buyer Email"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Created At</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting || isLoading}
          className="button col-span-2 w-full bg-blue-600 hover:bg-blue-700"
        >
          {form.formState.isSubmitting || isLoading 
            ? "Submitting..." 
            : `${type} Order `}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;