"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { usePhotoViewerStore } from "../model/store";

const GridTypeTabs = () => {
  const { viewMode, setViewMode } = usePhotoViewerStore();

  return (
    <div className="flex gap-2 bg-[#F2F2F7] rounded-full p-[2px]">
      <Button
        size="icon"
        className={cn(
          "w-[32px] h-[32px] rounded-full shadow-none",
          viewMode === "grid" ? "bg-white" : "bg-inherit"
        )}
        onClick={() => setViewMode("grid")}
      >
        <Image src="/images/gallery.svg" alt="grid" width={15} height={15} />
      </Button>
      <Button
        size="icon"
        className={cn(
          "w-[32px] h-[32px] rounded-full shadow-none",
          viewMode === "list" ? "bg-white" : "bg-inherit"
        )}
        onClick={() => setViewMode("list")}
      >
        <Image
          src="/images/grid_view.svg"
          alt="grid_view"
          width={15}
          height={15}
        />
      </Button>
      <Button
        size="icon"
        className={cn(
          "w-[32px] h-[32px] rounded-full shadow-none",
          viewMode === "grid_on" ? "bg-white" : "bg-inherit"
        )}
        onClick={() => setViewMode("grid_on")}
      >
        <Image src="/images/grid_on.svg" alt="grid_on" width={15} height={15} />
      </Button>
    </div>
  );
};

export default GridTypeTabs;
