"use client";

import dynamic from "next/dynamic";
import React from "react";

const TimePicker = dynamic(() => import("@/shared/ui/time-picker"), {
  ssr: false,
});

const EventCreatePage = () => {
  return (
    <div>
      <TimePicker />
    </div>
  );
};

export default EventCreatePage;
