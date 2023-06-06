import Filter from "./Filter";
import Grid from "./Grid";

export const metadata = {
  title: "Gallery",
  description: "Browse projects I did",
};

export default function Gallery({searchParams,}: {
  searchParams: { categories: string | null };
})
{
    if(searchParams.categories === null) searchParams.categories = "all"
  return (
    <div className="w-full min-h-screen p-24 px-48">
      <Filter />
      {/* @ts-expect-error Server Component */}
      <Grid searchParams={searchParams.categories} />
    </div>
  );
}
