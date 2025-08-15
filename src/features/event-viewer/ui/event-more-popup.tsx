"use client";

import { Button } from "@/shared/ui/button";
import { overlay } from "overlay-kit";

import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import Link from "next/link";
import EventDetailDrawer from "./event-detail-drawer";
import { Event, PlanUsage } from "@/features/event-viewer/model/types";
import { useUserStore } from "@/features/login/model/store";

type Props = {
  event: Event;
  planUsage: PlanUsage;
};

const EventMorePopup = ({ event, planUsage }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(event);

  const { user } = useUserStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[#F2F2F7] text-black text-[16px] font-semibold h-[48px] w-[48px]">
            <Image src="/images/more.svg" alt="more" width={16} height={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/event/edit/${user?.userIdx}`}>편집</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            상세 정보
          </DropdownMenuItem>
          <DropdownMenuItem>전체 파일 내보내기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EventDetailDrawer
        event={event}
        planUsage={planUsage}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />
    </>
  );
};

export default EventMorePopup;
