import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center">
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl leading-tight text-gray-500 dark:text-gray-400 mb-6 line-text`}
      >
        Get In Touch
      </h2>
      <p className={`sm:text-lg sm:leading-relaxed mb-6`}>
        Node JS framework that a generator. D3. Although there are strong
        outward similarities between JavaScript.
      </p>
      <p>
        <a
          tabIndex={0}
          className="text-red-600 dark:text-red-400 md:inline-block block mb-2 md:mb-2 mr-12"
          href="#experience"
        >
          anthonyfreda323@gmail.com
        </a>
        <a
          tabIndex={0}
          className="text-red-600 dark:text-red-400 md:inline-block block mb-2 md:mb-2 mr-12"
          href="#experience"
        >
          https://github.com/Afreda323
        </a>
      </p>
    </section>
  );
}
