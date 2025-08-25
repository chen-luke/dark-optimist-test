import React from "react";
import { IoMdBook } from "react-icons/io";
// import { TfiMicrophone } from "react-icons/tfi";
// import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="container relative w-full min-h-[400px] lg:h-[400px] self-center">
      <div className="relative z-10 flex flex-col lg:flex-row h-full min-h-[400px]">
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 lg:py-20 bg-[url('../../public/footer-bg.png')] bg-center bg-no-repeat bg-cover">
          <div className="flex items-start space-x-4 py-27">
            <div className="w-16 h-16">
              <div className="w-16 h-full bg-[url('/QuoteMarks.svg')] bg-no-repeat bg-contain"></div>
            </div>
            <div className="max-w-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[url('/logo.png')] bg-center bg-no-repeat bg-cover rounded-full mr-3"></div>
                <h2 className="text-white text-xl font-normal">
                  Dark Optimist
                </h2>
              </div>
              <p className="text-white text-sm  leading-relaxed">
                Being a dark optimist means you don&lsquo;t turn away from the
                dark. Instead, you embrace the darkness and use it to find the
                light. There is no light without darkness.
              </p>
            </div>
          </div>
          <figcaption className="text-gray-400 text-xs self-end">
            Photo taken by Tito Texidor III
          </figcaption>
        </div>
        <div className="relative bg-white lg:w-[400px] flex flex-col justify-center px-20 py-20 pt-[35px] h-[300px] lg:h-full">
          <h3 className="text-xl font-normal mb-8 text-black">Connect</h3>
          <div className="flex space-x-4 mb-8 lg:mb-0">
            <a
              className="cursor"
              href="https://www.amazon.com/dp/163735326X?_encoding=UTF8&psc=1&ref=cm_sw_r_ffobk_cp_ud_dp_BTV9E2SK8JTNE4MGMD7J_1&ref_=cm_sw_r_ffobk_cp_ud_dp_BTV9E2SK8JTNE4MGMD7J_1&social_share=cm_sw_r_ffobk_cp_ud_dp_BTV9E2SK8JTNE4MGMD7J_1&bestFormat=true&previewDoh=1&previewDohDeal=1"
              target="_blank"
            >
              <IoMdBook className="text-black h-8 w-auto"></IoMdBook>
            </a>
            {/* <a className="cursor" href="#podcast-section">
              <TfiMicrophone className="text-black h-8 w-auto"></TfiMicrophone>
            </a> */}
            {/* <a
              className="cursor"
              href="https://www.youtube.com/watch?v=-riFWQ4w3zg"
              target="_blank"
            >
              <FaYoutube className="text-black h-8 w-auto"></FaYoutube>
            </a> */}
            <a
              className="cursor"
              href="https://www.linkedin.com/in/rhg3d/"
              target="_blank"
            >
              <FaLinkedin className="text-black h-8 w-auto"></FaLinkedin>
            </a>
          </div>
          <div className="absolute bottom-0 right-0 w-full h-auto border-l-[80px] border-l-transparent border-b-[80px] border-b-optimist-red"></div>
        </div>
      </div>
      <div className="absolute bottom-6 left-20 z-20">
        <p className="text-white text-xs">
          © 2025 Dark Optimist. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
