import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Calendar, Ticket, Package, ArrowRight, PlusCircle, Sparkles } from "lucide-react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-12 md:py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="wrapper relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Welcome Back!</span>
            </div>
            <h1 className="h1-bold text-white mb-4">Your Dashboard</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Manage your event tickets and created packages all in one place
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="wrapper -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">My Tickets</p>
                  <h3 className="text-3xl font-bold mt-2">{orderedEvents.length}</h3>
                  <p className="text-sm text-gray-400 mt-1">Active tickets</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Ticket className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">My Packages</p>
                  <h3 className="text-3xl font-bold mt-2">{organizedEvents?.data?.length || 0}</h3>
                  <p className="text-sm text-gray-400 mt-1">Created packages</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Package className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {orderedEvents.filter((event: any) => 
                      new Date(event.startDateTime) > new Date()
                    ).length}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Coming soon</p>
                </div>
                <div className="p-3 bg-pink-100 rounded-full">
                  <Calendar className="w-8 h-8 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* My Tickets Section */}
      <section className="wrapper mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <h2 className="h2-bold text-gray-900">My Tickets</h2>
            </div>
            <p className="text-gray-600 max-w-2xl">
              All your purchased event tickets in one place. Never miss an event with easy access to your schedule.
            </p>
          </div>
          <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Link href="/#events">
              <ArrowRight className="w-4 h-4" />
              Explore More Events
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-1">
          <Collection
            data={orderedEvents}
            emptyTitle={
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Ticket className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="h3-bold text-gray-900 mb-3">No event tickets purchased yet</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  You haven't purchased any tickets yet. Explore our exciting events and be part of amazing experiences!
                </p>
                <Button asChild className="gap-2">
                  <Link href="/#events">
                    Browse Events
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            }
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName="ordersPage"
            totalPages={orders?.totalPages}
          />
        </div>
      </section>

      {/* Packages Section */}
      <section className="wrapper mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-3">
                <h2 className="h2-bold text-gray-900">My Packages</h2>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  Creator
                </Badge>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Manage all your created packages. Share your knowledge and create amazing learning experiences.
            </p>
          </div>
          <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link href="/events/studentform">
              <PlusCircle className="w-4 h-4" />
              Create New Package
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-1">
          <Collection
            data={organizedEvents?.data}
            emptyTitle={
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="h3-bold text-gray-900 mb-3">No packages created yet</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Start sharing your expertise! Create your first package and help others learn something new today.
                </p>
                <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link href="/events/studentform">
                    <PlusCircle className="w-4 h-4" />
                    Create Your First Package
                  </Link>
                </Button>
              </div>
            }
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages}
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="wrapper mb-16">
        <h3 className="h3-bold text-center mb-8 text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-lg mb-2">View Calendar</h4>
                <p className="text-sm text-gray-600 mb-4">See all your upcoming events in calendar view</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/calendar">Open Calendar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 rounded-full mb-4">
                  <Ticket className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-lg mb-2">Ticket History</h4>
                <p className="text-sm text-gray-600 mb-4">View your past event tickets and attendance</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile/tickets">View History</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-pink-100 rounded-full mb-4">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="font-bold text-lg mb-2">Analytics</h4>
                <p className="text-sm text-gray-600 mb-4">Track your package performance and engagement</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile/analytics">View Stats</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;