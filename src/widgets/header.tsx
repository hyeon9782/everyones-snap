"use client";

import { useUserStore } from "@/features/login/model/store";
import { Button } from "@/shared/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout } = useUserStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isLoging = user?.userIdx ? true : false;

  const handleLogoutClick = () => {
    alert("로그아웃");
    logout();
    router.push("/login");
    closeMenu();
  };

  // pathname이 변경될 때마다 메뉴 자동으로 닫기
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50">
      <header className="bg-white px-4 h-[48px] flex justify-between items-center">
        <Link href="/" className="text-[18px] font-bold">
          모두의스냅
        </Link>

        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          <MenuIcon className="size-6" />
        </Button>
      </header>

      {/* 메뉴 외부 클릭 시 닫기 - z-index를 더 높게 설정 */}
      {isMenuOpen && <div className="fixed inset-0 z-40" onClick={closeMenu} />}

      {/* 드롭다운 메뉴 - z-index를 더 높게 설정 */}
      {isMenuOpen && (
        <div className="border-t fixed top-[48px] left-1/2 -translate-x-1/2 w-full bg-white shadow-lg border-b border-gray-200 transition-all duration-300 ease-in-out max-w-[375px] z-50 opacity-100 max-h-96 translate-y-0">
          <div className="px-4 py-2">
            <Link
              href="/"
              className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold transition-colors duration-200"
            >
              홈
            </Link>
            {!isLoging && (
              <Link
                href="/trial"
                className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold transition-colors duration-200"
              >
                무료 체험하기
              </Link>
            )}
            {isLoging && (
              <Link
                href={`/host/${user?.userIdx}`}
                className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold transition-colors duration-200"
              >
                나의 이벤트
              </Link>
            )}
            <Link
              href="/price"
              className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold transition-colors duration-200"
            >
              가격
            </Link>
            {!isLoging && (
              <Link
                href="/login"
                className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold transition-colors duration-200"
              >
                로그인
              </Link>
            )}
            {isLoging && (
              <>
                <Link
                  href="/payment/history"
                  className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold transition-colors duration-200"
                >
                  결제 내역
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="flex justify-center items-center w-full px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold transition-colors duration-200"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
