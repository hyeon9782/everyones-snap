import { login } from "@/features/login/api/login.api";
import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // 카카오 로그인 성공 후 백엔드 API 호출
      if (account?.provider === "kakao" && account?.providerAccountId) {
        try {
          console.log("account", account);
          console.log("user", user);
          // 기존 login 함수 사용
          const response = await login({
            id: account.providerAccountId,
            platformType: "kakao",
          });

          console.log("response", response);

          // 백엔드 응답에 따라 처리
          return true;
        } catch (error) {
          // 로그인 실패 시 회원가입 시도 가능
          console.error("Login failed:", error);
          return true;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
