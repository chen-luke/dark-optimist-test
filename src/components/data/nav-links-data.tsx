import { IoHomeOutline } from "react-icons/io5";
import { IoMdBook } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { FaPodcast } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";

export type NavLink = {
  label: string;
  icon?: React.ReactNode;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#", icon: <IoHomeOutline /> },
  { label: "Bio", href: "#author-section", icon: <MdOutlinePersonOutline /> },
  { label: "Mission", href: "#mission-section", icon: <MdOutlineArticle /> },
  { label: "Read The Book", href: "#book-section", icon: <IoMdBook /> },
  { label: "Podcasts", href: "#podcast-section", icon: <FaPodcast /> },
  { label: "Video Interviews", href: "#video-section", icon: <FaVideo /> },
];

export default navLinks;
