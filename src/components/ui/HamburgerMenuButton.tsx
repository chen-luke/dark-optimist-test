import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

interface HamburgerMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HamburgerMenuButton: React.FC<HamburgerMenuButtonProps> = ({
  isOpen,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    aria-label="Toggle Mobile Menu"
    className="flex lg:hidden text-foreground hover:bg-accent hover:text-accent-foreground"
  >
    {isOpen ? (
      <IoClose className="h-10 w-10 hover:text-optimist-red transition-colors duration-300 ease-in-out" />
    ) : (
      <RxHamburgerMenu className="h-10 w-10 hover:text-optimist-red transition-colors duration-300 ease-in-out" />
    )}
  </button>
);

export default HamburgerMenuButton;
