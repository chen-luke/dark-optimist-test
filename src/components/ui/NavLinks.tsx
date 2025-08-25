import Link from "next/link";
import navItems, { NavLink } from "../data/nav-links-data";

const NavLinks: React.FC = () => {
  return (
    <div className="hidden lg:flex items-center gap-6 justify-center">
      {navItems.map((link: NavLink) => (
        <Link
          href={link.href}
          key={link.href}
          className="text-foreground/80 transition-colors hover:underline hover:underline-offset-4 hover:text-optimist-red duration-200 py-2 flex items-center gap-2"
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
