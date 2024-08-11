import { Work } from "@/app/works/abc/abc-store";
import { PostgrestResponse } from "@supabase/supabase-js";

export const works = async (): Promise<PostgrestResponse<Work> | null> => {
  try {
    const response = await fetch("https://www.api.yz13.space/works", {
      method: "GET",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};
