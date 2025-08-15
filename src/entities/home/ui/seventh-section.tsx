import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

const SeventhSection = () => {
  return (
    <section className="h-[785px] flex items-center justify-center">
      <div className="flex flex-col gap-10 w-full">
        <h2 className="text-[#344054] text-center text-[28px] font-semibold">
          궁금한점이 있으신가요?
        </h2>
        <div className="flex flex-col gap-3 px-4">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-3"
            defaultValue="item-1"
          >
            <AccordionItem
              value="item-1"
              className="bg-[#F1F5F9] rounded-lg px-4 shadow-none border-none"
            >
              <AccordionTrigger className="text-[#344054] text-[16px] font-semibold">
                게스트가 별도로 앱을 설치해야 하나요?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                게스트는 별도로 앱을 설치하거나 회원가입을 할 필요가 없어요.
                QR코드를 스캔하거나 공유된 링크에 접속하면 바로 사진을
                업로드하고 갤러리를 확인할 수 있어요. 설치도, 가입도 없이
                간편하게 이용 가능합니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="bg-[#F1F5F9] rounded-lg px-4 shadow-none border-none"
            >
              <AccordionTrigger className="text-[#344054] text-[16px] font-semibold">
                QR코드를 이용해서 어떻게 게스트 사진을 받을 수 있나요?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                행사 당일, 게스트가 스마트폰으로 QR코드를 스캔하면 사진 업로드
                페이지가 열립니다. 게스트가 촬영한 사진을 올리면 모든 사진이
                실시간으로 한 곳에 모여, 주최자가 바로 확인할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="bg-[#F1F5F9] rounded-lg px-4 shadow-none border-none"
            >
              <AccordionTrigger className="text-[#344054] text-[16px] font-semibold">
                이벤트보다 훨씬 전에 구매해도 되나요?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                가능합니다. 미리 구매해두면 행사 준비가 훨씬 편리합니다. 행사
                한달전에 이벤트를 생성하여 QR코드와 업로드 링크를 활성화해
                사용하시면 됩니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-4"
              className="bg-[#F1F5F9] rounded-lg px-4 shadow-none border-none"
            >
              <AccordionTrigger className="text-[#344054] text-[16px] font-semibold">
                이미 행사가 끝났는데, 지금 써도 되나요?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                네, 행사 종료 후 3개월 동안은 사진 업로드와 다운로드가 모두
                가능합니다. 이 기간이 지나면 업로드와 다운로드 모두 불가능하니,
                필요한 사진은 미리 받아두세요.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-5"
              className="bg-[#F1F5F9] rounded-lg px-4 shadow-none border-none"
            >
              <AccordionTrigger className="text-[#344054] text-[16px] font-semibold">
                QR코드는 어떻게 생성하나요?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                이용권을 구매후 이벤트 생성시 자동으로 QR코드가 생성됩니다. 이
                QR코드를 다운로드·출력해 행사장에 배치하면, 게스트가 바로 사진을
                업로드할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-6"
              className="bg-[#F1F5F9] rounded-lg px-4 shadow-none border-none"
            >
              <AccordionTrigger className="text-[#344054] text-[16px] font-semibold">
                기업 행사 같은 대형 이벤트에도 적합한가요?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                네, 가능합니다. k-pop행사, 축제, 기업 행사, 대회 등 다양한
                대규모 이벤트에서 활용하실 수 있습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default SeventhSection;
