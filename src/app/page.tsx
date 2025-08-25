import Bio from "@/components/features/bio/bio";
import Book from "@/components/features/book-section/book";
import CallToAction from "@/components/features/cta/cta";
import Footer from "@/components/features/footer/footer";
import Mission from "@/components/features/mission/mission";
import Navbar from "@/components/features/nav/nav";
import Podcasts from "@/components/features/podcast-section/podcast-section";
import VideoSection from "@/components/features/video/video-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <CallToAction />
      <Bio />
      <Mission />
      <Book />
      <Podcasts />
      <VideoSection />
      <Footer />
    </>
  );
}
