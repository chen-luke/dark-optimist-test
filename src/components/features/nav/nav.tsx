"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import NavLinks from "@/components/ui/NavLinks";
import HamburgerMenuButton from "@/components/ui/HamburgerMenuButton";
import HamburgerMenu from "@/components/ui/HamburgerMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // This hook handles the scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="container w-screen flex fixed top-0 bg-black z-50 justify-between self-center flex-col">
      <div className="flex justify-between items-center px-5 py-5 xl:px-10">
        <div className="flex justify-center items-center gap-5">
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="dark optimist website logo"
            className="h-14 w-auto"
          />
          <h1 className="hidden md:flex text-2xl font-bold">Dark Optimist</h1>
        </div>

        <NavLinks />
        <HamburgerMenuButton
          isOpen={isMobileMenuOpen}
          onToggle={toggleMobileMenu}
        />
        <HamburgerMenu isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
      </div>
      <div
        className="h-1 bg-optimist-red transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </nav>
  );
}
