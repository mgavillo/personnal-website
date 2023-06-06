import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { GalleryElement } from "../types/types";


export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export const getElements = cache(async () => {
  try {
    const { data } = await supabaseAdmin
      .from("Sources")
      .select("*")
      .order("id");
      // console.log("DATA", data);
      return data as GalleryElement[]
  } catch (e) {
    console.log(e);
  }
});
