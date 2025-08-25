import Link from "next/link";
import navLinks from "../data/nav-links-data";

type HamburgerMenuProp = {
  isOpen: boolean;
  onToggle: () => void;
};

const HamburgerMenu: React.FC<HamburgerMenuProp> = ({
  isOpen,
  onToggle,
}: HamburgerMenuProp) => {
  return (
    <>
      {isOpen && (
        <div className="flex flex-col text-xl left-0 top-[100px] border-t-2 border-optimist-red absolute bg-black lg:hidden w-screen px-19 pt-10 gap-4 h-screen">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={onToggle}
              className="flex gap-3 items-center text-white transition-colors hover:text-optimist-red duration-200"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
