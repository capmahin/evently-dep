import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
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
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          <p className="text-center text-blue-700">
            Welcome to T-Shirts Meenia{" "}
          </p>
          <br />
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Products Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />

        {/* this is Functionality */}
        {/* Day 2 */}
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-blue-500">T-shirt Menea!</h1>
            <p className="p-regular-24 md:p-regular-30 text-blue-700">
              “T-shirts are typically made of cotton textile in a stockinette or
              jersey knit, which has a distinctively pliable texture compared to
              shirts made of woven cloth”
            </p>
            <p className="p-regular-20 md:p-regular-24">
              A T-shirt is a style of fabric shirt named after the T shape of
              its body and sleeves. Traditionally, it has short sleeves and a
              round neckline, known as a crew neck, which lacks a collar.
              T-shirts are generally made of stretchy, light, and inexpensive
              fabric and are easy to clean.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero.webp"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
    </>
  );
}
