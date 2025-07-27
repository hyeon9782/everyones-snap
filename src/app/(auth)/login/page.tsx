import KakaoLoginButton from "@/features/login/ui/kakao-login-button";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-[50px] w-full px-5">
        <span className="text-[24px] font-semibold text-center">
          우리의 순간을 모두 함께 <br /> 기록하는 방법, 모두의 스냅
        </span>
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
