"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import TypingParagraph from "../../ui/CallToActionMultiLineAnimation";
import localFont from "next/font/local";

const ocrFont = localFont({
  src: "../../ui/fonts/OCRAStd.otf",
  display: "swap",
});

export default function CallToAction() {
  return (
    <section className="container flex flex-col items-center self-center justify-center pt-24 lg:flex-row xl:items-start">
      {/* --- 1. This entire first section is now hidden on mobile --- */}
      <div className="hidden w-full lg:grid">
        <Image
          src="/book-left.png"
          width={702}
          height={791}
          alt="Left book cover"
          className="h-auto w-full col-start-1 row-start-1"
          sizes="(max-width: 1023px) 100vw, 50vw"
          priority
        />
        {/* Original Text Overlay for Desktop */}
        <div className="col-start-1 row-start-1 flex h-full flex-row justify-start">
          <div className="z-10 flex-col self-start bg-black bg-opacity-70 p-5 text-white md:mt-[20%] md:w-[90%] lg:pl-[15%] md:pr-10 my:p-6 lg:py-10 xl:mt-[20%]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              <h1 className="text-3xl font-extrabold text-white underline decoration-optimist-red decoration-8 underline-offset-8 sm:text-4xl lg:text-6xl xl:text-6xl">

                DARK
              </h1>
              <h1 className="text-3xl font-extrabold text-white underline decoration-optimist-red sm:text-4xl decoration-8 underline-offset-8 mt-5 lg:text-6xl xl:text-6xl">
                OPTIMIST
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`mt-4 w-full text-xs text-white sm:text-sm lg:mt-8  ${ocrFont.className}`}
            >
              <span className="p-0.5 bg-white text-black">Being a</span> dark{" "}
              <span className="p-0.5 bg-white text-black">
                optimist means you don&lsquo;t turn away from the dark instead
                you embrace the
              </span>{" "}
              darkness{" "}
              <span className="p-0.5 bg-white text-black">
                and use it to find the light. There is no light without
              </span>{" "}
              darkness.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Second Book Section - Now contains both text blocks */}
      <div className="grid w-full">
        <Image
          src="/book-right.png"
          width={800}
          height={400}
          alt="Right book cover"
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="h-auto w-full col-start-1 row-start-1"
        />

        {/* --- 2. New wrapper for all overlay content --- */}
        <div className="col-start-1 row-start-1 flex flex-col items-center lg:items-end pt-[20%]">
          {/* --- 3. Copied "Dark Optimist" text, ONLY for mobile --- */}
          <div className="z-10 bg-black bg-opacity-70 p-5 text-white w-[80%] lg:hidden border-b-2 border-optimist-red">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-extrabold text-white underline decoration-optimist-red decoration-4 sm:text-4xl lg:text-6xl xl:text-6xl">
                DARK
              </h1>
              <h1 className="text-3xl font-extrabold text-white underline decoration-optimist-red decoration-4 mt-2 sm:text-4xl lg:text-6xl xl:text-6xl">
                OPTIMIST
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`mt-4 w-full text-xs text-white sm:text-sm lg:mt-8 ${ocrFont.className}`}
            >
              <span className="p-0.5 bg-white text-black">Being a</span> dark{" "}
              <span className="p-0.5 bg-white text-black">
                optimist means you don&lsquo;t turn away from the dark instead
                you embrace the
              </span>{" "}
              darkness{" "}
              <span className="p-0.5 bg-white text-black">
                and use it to find the light. There is no light without
              </span>{" "}
              darkness.
            </motion.p>
          </div>

          {/* --- 4. Original "Typing" text, pushed down by the block above on mobile --- */}
          <div className="mt-4 bg-black p-5 mb-15 md:mt-[10%] w-[80%] lg:mt-[10%] lg:w-[80%] border-b-2 border-optimist-red lg:border-b-0 sm:mt-15 md:mt-0">
            <TypingParagraph
              lines={[
                "WE HAVE NOTHING TO LOSE",
                "A DARK OPTIMIST'S",
                "CALL TO ACTION",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
