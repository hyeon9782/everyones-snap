"use client";

import { cn } from "@/shared/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  items: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  initialValue?: string;
};

const BasicSelect = ({
  value,
  onChange,
  items,
  className,
  placeholder,
  initialValue,
}: Props) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={initialValue}>
      <SelectTrigger
        className={cn(
          "min-w-[180px] border-none shadow-none text-[16px] text-[#8E8E93] font-medium p-0",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BasicSelect;
