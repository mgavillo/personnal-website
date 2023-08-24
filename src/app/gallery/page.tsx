import { getElements } from "@/lib/supabase";
import Filter from "./Filter";
import Grid from "./Grid";
import { GalleryElement } from "@/types/types";

export const metadata = {
  title: "Gallery",
  description: "Browse projects I did",
};

function filterData(data: GalleryElement[] | undefined, categories: string, animation: string) {
  if (!data) return [];
  return data.filter((el) => {
    if(!animation.includes(el.animation)) return 0
    for (var i = 0; i < el.tags.length; i++) {
      if (categories?.includes(el.tags[i])) return 1;
    }
    return 0;
  });
}

export default async function Gallery({
  searchParams,
}: {
  searchParams: {
    static: string | null;
    animated: string | null;
    interactive: string | null;
    categories: string | null;
  };
}) {
  const _data = getElements();
  const [data] = await Promise.all([_data]);
  let filteredData;

  if (searchParams.categories == "all" || searchParams.categories == undefined) filteredData = data;
  else
    filteredData = filterData(
      data,
      searchParams.categories,
      `${searchParams.animated == "true" ? "animated" : ""},${
        searchParams.interactive == "true" ? "interactive" : ""
      },${searchParams.static == "true" ? "static" : ""}`
    );

  return (
    <section className="h-fit min-h-screen pt-24 pl-4 flex flex-col md:flex-row justify-between gap-24">
      <Filter />
      <Grid data={filteredData} />
    </section>
  );
}
