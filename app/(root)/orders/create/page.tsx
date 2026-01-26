
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import OrderForm from "@/components/shared/OrderForm";
import { SearchParamProps } from "@/types";

interface CreateOrderProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const CreateOrder = ({ searchParams }: CreateOrderProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  if (!userId) redirect('/');

  const eventId = typeof searchParams.eventId === 'string' ? searchParams.eventId : undefined;

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
      <div className="wrapper flex items-center justify-center sm:px-5">
        <div className="w-full max-w-5xl">
          <OrderForm 
            userId={userId}
            type="Create"
            order={undefined}
            orderId={undefined}
            eventId={eventId}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateOrder;