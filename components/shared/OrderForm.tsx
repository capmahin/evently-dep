"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

const fieldBox =
  "flex items-center gap-3 h-[54px] w-full overflow-hidden rounded-xl px-4 py-2 border border-white/10 focus-within:border-yellow-300/40 transition-colors duration-200";
const fieldStyle = { background: "rgba(255,255,255,0.05)" };
const inputClass =
  "border-0 bg-transparent outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/30 text-sm p-0";
const labelClass =
  "text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-1.5 block";

const OrderForm = ({
  userId,
  type,
  order,
  orderId,
  eventId
}: OrderFormProps & { eventId?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const initialValues =
    order && type === "Update"
      ? {
          whatsappNumber: order.whatsappNumber,
          totalAmount: order.totalAmount.toString(),
          eventId: order.event.toString(),
          buyerName: order.buyer.name,
          buyerNumber: order.buyer.number,
          buyerEmail: order.buyer.email,
          status: order.status,
          createdAt: new Date(order.createdAt).toISOString().split("T")[0]
        }
      : {
          ...orderDefaultValues,
          eventId: eventId || orderDefaultValues.eventId
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
          totalAmount: parseFloat(values.totalAmount) || 0,
          createdAt: new Date(values.createdAt)
        });
        if (newOrder) {
          setCreatedOrderId(newOrder._id);
          setIsSuccess(true);
          form.reset();
          setTimeout(() => {
            router.push(`/orders/${newOrder._id}`);
          }, 2000);
        }
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to submit assignment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="relative">
      {/* ── Success Banner ── */}
      {isSuccess && (
        <div
          className="mb-6 p-4 rounded-xl border border-green-400/20 flex items-center gap-3"
          style={{ background: "rgba(34,197,94,0.08)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
            style={{
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.3)"
            }}
          >
            ✅
          </div>
          <div>
            <h3 className="font-black text-white text-sm">
              Assignment Submitted!
            </h3>
            <p className="text-white/40 text-xs">
              Redirecting to submission details...
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* ── Section 1: Student Info ── */}
          <div>
            <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
              🎓 Student Information
            </p>
            <div className="flex flex-col gap-4">
              {/* Student Name */}
              <FormField
                control={form.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Full Name</FormLabel>
                    <FormControl>
                      <div className={fieldBox} style={fieldStyle}>
                        <span className="text-yellow-300/50 shrink-0">👤</span>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className={inputClass}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs pl-2" />
                  </FormItem>
                )}
              />

              {/* Student ID + Email side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="buyerNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        Student ID / Roll
                      </FormLabel>
                      <FormControl>
                        <div className={fieldBox} style={fieldStyle}>
                          <span className="text-yellow-300/50 shrink-0">
                            🪪
                          </span>
                          <Input
                            placeholder="e.g. 2021-CS-001"
                            {...field}
                            className={inputClass}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs pl-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buyerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className={fieldBox} style={fieldStyle}>
                          <span className="text-yellow-300/50 shrink-0">
                            📧
                          </span>
                          <Input
                            type="email"
                            placeholder="you@email.com"
                            {...field}
                            className={inputClass}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs pl-2" />
                    </FormItem>
                  )}
                />
              </div>

              {/* WhatsApp */}
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      WhatsApp Number
                    </FormLabel>
                    <FormControl>
                      <div className={fieldBox} style={fieldStyle}>
                        <span className="text-yellow-300/50 shrink-0">📱</span>
                        <Input
                          placeholder="+880 1XXX-XXXXXX"
                          {...field}
                          className={inputClass}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs pl-2" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ── Section 2: Assignment Info ── */}
          <div>
            <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
              📋 Assignment Info
            </p>
            <div className="flex flex-col gap-4">
              {/* Assignment ID (hidden but shown) */}
              <FormField
                control={form.control}
                name="eventId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Assignment ID</FormLabel>
                    <FormControl>
                      <div className={fieldBox} style={fieldStyle}>
                        <span className="text-yellow-300/50 shrink-0">🔗</span>
                        <Input
                          placeholder="Assignment ID"
                          {...field}
                          className={inputClass}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs pl-2" />
                  </FormItem>
                )}
              />

              {/* Marks + Date side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        Marks Obtained
                      </FormLabel>
                      <FormControl>
                        <div className={fieldBox} style={fieldStyle}>
                          <span className="text-yellow-300/50 shrink-0">
                            🎯
                          </span>
                          <Input
                            type="number"
                            placeholder="e.g. 85"
                            {...field}
                            className={inputClass}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs pl-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="createdAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        Submission Date
                      </FormLabel>
                      <FormControl>
                        <div className={fieldBox} style={fieldStyle}>
                          <span className="text-yellow-300/50 shrink-0">
                            📅
                          </span>
                          <Input
                            type="date"
                            {...field}
                            className={`${inputClass} [color-scheme:dark]`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs pl-2" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* ── Section 3: Status (Teacher view) ── */}
          <div>
            <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
              👨‍🏫 Submission Status
            </p>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Current Status</FormLabel>
                  <FormControl>
                    <div className={fieldBox} style={fieldStyle}>
                      <span className="text-yellow-300/50 shrink-0">📊</span>
                      <select
                        {...field}
                        className="w-full bg-transparent text-white text-sm outline-none border-0 focus:ring-0"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <option value="" style={{ background: "#1a1a2e" }}>
                          Select status
                        </option>
                        <option
                          value="pending"
                          style={{ background: "#1a1a2e" }}
                        >
                          ⏳ Pending Review
                        </option>
                        <option
                          value="processing"
                          style={{ background: "#1a1a2e" }}
                        >
                          🔍 Under Review
                        </option>
                        <option
                          value="completed"
                          style={{ background: "#1a1a2e" }}
                        >
                          ✅ Graded
                        </option>
                        <option
                          value="cancelled"
                          style={{ background: "#1a1a2e" }}
                        >
                          ❌ Rejected
                        </option>
                        <option
                          value="refunded"
                          style={{ background: "#1a1a2e" }}
                        >
                          ↩️ Returned
                        </option>
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs pl-2" />
                </FormItem>
              )}
            />
          </div>

          {/* ── Submit ── */}
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting || isLoading}
            className="w-full rounded-xl font-black text-black text-sm tracking-widest uppercase py-4 border-0 transition-all duration-300 hover:scale-[1.01] shadow-lg hover:shadow-yellow-300/20"
            style={{
              background:
                form.formState.isSubmitting || isLoading
                  ? "rgba(253,224,71,0.5)"
                  : "#fde047"
            }}
          >
            {form.formState.isSubmitting || isLoading
              ? "Submitting..."
              : type === "Create"
                ? "🚀 Submit Assignment"
                : "✏️ Update Submission"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
