"use client";

import { Button } from "@/shared/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoging = true;

  const handleLogoutClick = () => {
    alert("로그아웃");
    router.push("/login");
    toggleMenu();
  };

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 bg-white px-4 h-[48px] flex justify-between items-center">
        <span className="text-[18px] font-bold">모두의스냅</span>

        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          <MenuIcon className="size-6" />
        </Button>
      </header>

      {/* 드롭다운 메뉴 */}
      <div
        className={`border-t fixed top-[48px] left-0 w-full bg-white shadow-lg border-b border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen
            ? "opacity-100 max-h-96 translate-y-0"
            : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 py-2">
          <Link
            href="/"
            onClick={toggleMenu}
            className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold"
          >
            홈
          </Link>
          {!isLoging && (
            <Link
              href="/trial"
              onClick={toggleMenu}
              className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold"
            >
              무료 체험하기
            </Link>
          )}
          {isLoging && (
            <Link
              href="/pricing"
              onClick={toggleMenu}
              className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold"
            >
              나의 이벤트
            </Link>
          )}
          <Link
            href="/pricing"
            onClick={toggleMenu}
            className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold"
          >
            가격
          </Link>
          {!isLoging && (
            <Link
              href="/login"
              onClick={toggleMenu}
              className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold"
            >
              로그인
            </Link>
          )}
          {isLoging && (
            <>
              <Link
                href="/payment/history"
                onClick={toggleMenu}
                className="text-center block px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold"
              >
                결제 내역
              </Link>
              <button
                onClick={handleLogoutClick}
                className="flex justify-center items-center w-full px-4 py-3 text-black hover:bg-blue-50 rounded-lg text-[16px] font-semibold"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>

      {/* 메뉴 외부 클릭 시 닫기 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30" onClick={toggleMenu} />
      )}
    </div>
  );
};

export default Header;
