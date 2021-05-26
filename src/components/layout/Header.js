import React from "react";

export default function Header() {
  return (
    <header className="min-h-screen flex flex-col justify-center py-12">
      <h1 className="text-5xl sm:text-7xl">Anthony Freda</h1>
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl text-gray-500 dark:text-gray-400 mb-12`}
      >
        <span>Lead Engineer</span>{" "}
        <a
          tabIndex={0}
          className="text-red-600 dark:text-red-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Movement Mortgage
        </a>
      </h2>
      <p className={`sm:text-lg sm:leading-relaxed mb-12`}>
        Node JS framework that a generator. D3. Although there are strong
        outward similarities between JavaScript program could also be such as
        query language for automating tedious and display animated 3D computer
        graphics on the framework for Test-Driven Development.
      </p>
      <p className="text-lg sm:text-xl">
        <a
          tabIndex={0}
          className="text-red-600 dark:text-red-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
          href="#about"
        >
          About me
        </a>
        <a
          tabIndex={0}
          className="text-red-600 dark:text-red-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
          href="#experience"
        >
          Experience
        </a>
        <a
          tabIndex={0}
          className="text-red-600 dark:text-red-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
          href="#contact"
        >
          Contact
        </a>
      </p>
    </header>
  );
}
