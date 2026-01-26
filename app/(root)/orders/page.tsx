import Search from "@/components/shared/Search";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Link from "next/link";
// Define interface for the aggregated order result from getOrdersByEvent
interface AggregatedOrderResult {
  _id: string;
  totalAmount: string | number;
  createdAt: string;
  eventTitle: string;
  eventId: string;
  buyer: string;
}

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-cyan-100 py-8 md:py-12">
        <div className="wrapper max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="h1-bold text-3xl md:text-4xl text-gray-900 mb-2">Travel Booking Orders</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Manage your travel bookings and reservations in one place</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
            <Search placeholder="Search booking reference..." />
          </div>
        </div>
      </section>

      <section className="wrapper max-w-6xl mx-auto px-4 pb-12">
        {orders && orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="h3-bold text-gray-900 mb-2">No Travel Bookings Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">Looks like you haven't made any travel bookings yet. Start exploring destinations!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders &&
              orders.map((row: AggregatedOrderResult) => (
                <div 
                  key={row._id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {row.eventTitle.charAt(0)}
                          </div>
                          <div>
                            <h3 className="h4-bold text-gray-900">{row.eventTitle}</h3>
                            <p className="text-gray-600 text-sm">Booking ID: {row._id.substring(0, 8)}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-gray-500 text-sm">Traveler</p>
                            <p className="font-medium">{row.buyer}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Booking Date</p>
                            <p className="font-medium">{formatDateTime(new Date(row.createdAt)).dateOnly}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Total Amount</p>
                            <p className="font-medium text-blue-600">{formatPrice(row.totalAmount.toString())}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end justify-center">
                        <div className="text-right mb-4">
                          <p className="text-gray-500 text-sm">Status</p>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            Confirmed
                          </span>
                        </div>
                        <Link href={`/orders/${row._id}`}>
                          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Orders;
