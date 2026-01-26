import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Hero from "@/components/shared/Hero";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  });
  return (
    <>
      <section id="events" className="  flex flex-col  ">
        <div >
          <Hero/>
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Exclusive Packages
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked collection of premium event packages tailored just for you
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-2xl">
              <Collection
                data={events?.data}
                emptyTitle="No Packages Found"
                emptyStateSubtext="Come back later"
                collectionType="All_Events"
                limit={6}
                page={page}
                totalPages={events?.totalPages}
              />
            </div>
          </div>

        </div>
        
        

        {/* <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div> */}

       
        {/* this is Functionality */}
        {/* Day 2 */}
      </section>
    </>
  );
}
