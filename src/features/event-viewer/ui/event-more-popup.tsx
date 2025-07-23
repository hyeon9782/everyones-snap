"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";

import React from "react";
import Image from "next/image";

const EventMorePopup = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-[#F2F2F7] text-black text-[16px] font-semibold h-[48px]">
          <Image src="/images/more.svg" alt="more" width={16} height={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>EventMorePopup</div>
      </PopoverContent>
    </Popover>
  );
};

export default EventMorePopup;
