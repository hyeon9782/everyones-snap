const EventFilterBox = () => {
  return (
    <div className="flex justify-between items-center px-4 pt-10 w-full">
      <span className="text-[20px] font-semibold">나의 이벤트</span>
      {/* <div className="flex gap-2">
        <BasicSelect
          items={[
            { label: "최신순", value: "latest" },
            { label: "오래된순", value: "oldest" },
          ]}
          initialValue="latest"
          className="w-fit h-[40px] bg-white rounded-full px-2"
          onChange={() => {}}
          placeholder="이벤트 정렬"
        />
      </div> */}
    </div>
  );
};

export default EventFilterBox;
