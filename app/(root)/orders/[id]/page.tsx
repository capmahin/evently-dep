import { getOrderById } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define interface for the order details
interface OrderDetails {
  _id: string;
  whatsappNumber: string;
  totalAmount: number;
  createdAt: Date;
  event: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
  };
  buyer: {
    name: string;
    number: string;
    email: string;
  };
  status: string;
}

const OrderDetailsPage = async ({ params }: SearchParamProps) => {
  const orderId = params.id as string;
  
  try {
    const order = await getOrderById(orderId) as OrderDetails;
    
    if (!order) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
            <Link href="/orders">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Booking Confirmation</h1>
            <p className="text-gray-600">Your travel booking details</p>
          </div>

          {/* Main Order Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            {/* Event Image Header */}
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src={order.event.imageUrl}
                alt={order.event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{order.event.title}</h2>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{order.event.location}</span>
                  </div>
                  <span className="text-white/70">•</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatDateTime(order.event.startDateTime).dateOnly}</span>
                  </div>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Order Details Content */}
            <div className="p-8">
              {/* Booking Reference */}
              <div className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Booking Reference</h3>
                    <p className="text-gray-600 font-mono">#{order._id.substring(0, 8).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Booked on</p>
                    <p className="font-medium">{formatDateTime(order.createdAt).dateTime}</p>
                  </div>
                </div>
              </div>

              {/* Buyer Information */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Traveler Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{order.buyer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{order.buyer.number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{order.buyer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">{order.whatsappNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Booking Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Package Price</span>
                      <span className="font-medium">{formatPrice(order.event.price)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-b border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                      <span className="text-xl font-bold text-blue-600">{formatPrice(order.totalAmount.toString())}</span>
                    </div>
                    <div className="pt-3">
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Paid & Confirmed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Package Details</h4>
                <p className="text-gray-700 leading-relaxed">{order.event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Start Date & Time</p>
                    <p className="font-medium">{formatDateTime(order.event.startDateTime).dateTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date & Time</p>
                    <p className="font-medium">{formatDateTime(order.event.endDateTime).dateTime}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/orders" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium">
                    View All Bookings
                  </Button>
                </Link>
                <Link href={`/events/${order.event._id}`} className="flex-1">
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-medium">
                    View Package Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600">Your travel package has been successfully booked. A confirmation has been sent to your email.</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load your booking details. Please try again later.</p>
          <Link href="/orders">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default OrderDetailsPage;