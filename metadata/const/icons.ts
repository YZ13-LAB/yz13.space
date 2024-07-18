import { getStorageItem } from "@yz13/supabase/storage";
import { Metadata } from "next";

export const icons: Metadata["icons"] = {
  icon: [
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: light)",
      url: getStorageItem(["static", "/brand/yz-light.svg"]),
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: dark)",
      url: getStorageItem(["static", "/brand/yz-dark.svg"]),
    },
  ],
};