import { getElements } from "@/lib/supabase";
import Element from "./Element";
import { GalleryElement } from "@/types/types";


function filterData(data:GalleryElement[] | undefined, searchParams: string){
  if(!data) return []
  return data.filter((el) => {
    for (var i = 0; i < el.tags.length; i++) {
      console.log(searchParams)
      if (searchParams?.includes(el.tags[i])) return 1;
    }
    return 0;
  });
}

export default async function Grid({
  searchParams,
}: {
  searchParams: string;
}) {
  const _data = getElements();
  const [data] = await Promise.all([_data]);
  console.log("TEST",data)

  let filteredData;
  if (searchParams == "all" || searchParams == undefined) filteredData = data;
  else
    filteredData = filterData(data, searchParams)

  console.log("TEST",filteredData)
  return (
    <div className="mt-4 gap-4 columns-xs w-full">
      {filteredData?.map((e, i) => (
        <div className="flex flex-col mb-4 gap-2">
          <Element element={e}/>
        </div>
      ))}
    </div>
  );
}
