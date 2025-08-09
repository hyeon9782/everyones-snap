import { Button } from "@/shared/ui/button";
import { Download } from "lucide-react";

const DownloadButton = () => {
  const handleDownload = () => {
    console.log("download");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-[44px] h-[44px] bg-[#344054]/50 rounded-full"
      onClick={handleDownload}
    >
      <Download className="text-white size-5" />
    </Button>
  );
};

export default DownloadButton;
