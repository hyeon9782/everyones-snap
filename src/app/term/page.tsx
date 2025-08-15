"use client";

import { signup } from "@/features/login/api/login.api";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TermPage = () => {
  const [terms, setTerms] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  // sessionStorage에서 id 값 가져오기
  useEffect(() => {
    const storedId = sessionStorage.getItem("tempUserId");
    const storedCode = sessionStorage.getItem("tempCode");
    const storedEmail = sessionStorage.getItem("tempEmail");

    if (!storedId || !storedCode || !storedEmail) {
      // id가 없으면 로그인 페이지로 리다이렉트
      console.log("No user ID found in sessionStorage, redirecting to login");
      router.push("/login");
      return;
    }

    setId(storedId);
    setCode(storedCode);
    setEmail(storedEmail);
    setIsLoading(false);
  }, [router]);

  // 전체 동의 상태 계산
  const allChecked = terms && personalInfo && marketing;

  // 필수 항목 체크 여부 확인
  const requiredChecked = terms && personalInfo;

  // 전체 동의 체크박스 변경
  const handleAllCheck = (checked: boolean) => {
    console.log("전체 동의 체크:", checked);
    setTerms(checked);
    setPersonalInfo(checked);
    setMarketing(checked);
  };

  // 확인 버튼 클릭
  const handleSubmit = async () => {
    if (!requiredChecked || !id) return;

    try {
      const response = await signup({
        id: id ?? "",
        code: code ?? "",
        email: email ?? "",
        platformType: "kakao",
        personalInfo: personalInfo ? "y" : "n",
        terms: terms ? "y" : "n",
        marketing: marketing ? "y" : "n",
      });

      console.log("Signup response:", response);

      router.push(`/host/${response.userIdx}`);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  // 로딩 중이거나 userId가 없으면 로딩 화면 표시
  if (isLoading || !id) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col gap-5 px-5 py-10">
        <span className="text-[#344054] text-[18px] font-semibold">
          서비스 이용을 위해 <br /> 아래 항목에 동의해주세요
        </span>
        <div className="bg-[#F2F2F7] rounded-lg px-5 py-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="all"
            className="w-[20px] h-[20px]"
            checked={allChecked}
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
          <label
            htmlFor="all"
            className="font-semibold text-[18px] text-[#344054] cursor-pointer"
          >
            전체 동의
          </label>
        </div>
        <div className="flex flex-col gap-5 pl-5 pr-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-[20px] h-[20px]"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className="text-[#344054] text-[16px] font-medium cursor-pointer"
              >
                (필수) 서비스 이용약관 동의
              </label>
            </div>
            <Button variant="ghost" size="icon" className="w-[24px] h-[24px]">
              <Image
                src="/images/arrow_forward_ios.svg"
                alt="arrow-right"
                width={8.7}
                height={15.82}
              />
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="personalInfo"
                className="w-[20px] h-[20px]"
                checked={personalInfo}
                onChange={(e) => setPersonalInfo(e.target.checked)}
              />
              <label
                htmlFor="personalInfo"
                className="text-[#344054] text-[16px] font-medium cursor-pointer"
              >
                (필수) 개인정보 수집 및 이용 동의
              </label>
            </div>
            <Button variant="ghost" size="icon" className="w-[24px] h-[24px]">
              <Image
                src="/images/arrow_forward_ios.svg"
                alt="arrow-right"
                width={8.7}
                height={15.82}
              />
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="marketing"
                className="w-[20px] h-[20px]"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <label
                htmlFor="marketing"
                className="text-[#344054] text-[16px] font-medium cursor-pointer"
              >
                (선택) 마케팅 정보 수신 동의
              </label>
            </div>
            <Button variant="ghost" size="icon" className="w-[24px] h-[24px]">
              <Image
                src="/images/arrow_forward_ios.svg"
                alt="arrow-right"
                width={8.7}
                height={15.82}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 left-0 right-0 flex justify-center px-4 w-full md:w-[375px] mx-auto">
        <Button
          className={`w-full h-[50px] rounded-lg font-semibold text-[18px] ${
            requiredChecked
              ? "bg-[#359EFF] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!requiredChecked}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default TermPage;
