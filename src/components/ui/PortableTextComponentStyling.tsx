// src/sanity/portable-text-components.ts

import { type PortableTextComponents } from "@portabletext/react";

const myPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-extrabold mb-6 pb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-md sm:text-xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-lg font-bold">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-md md:text-md mb-2 md:mb-4 leading-[26px] self-start">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 pl-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-4 pl-4">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },
  // ... your other components
};

export default myPortableTextComponents;
