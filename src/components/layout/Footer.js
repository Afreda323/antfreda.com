import React from "react";

export default function Footer() {
  return (
    <footer>
      <p className={`text-sm sm:text-base sm:leading-relaxed pb-2`}>
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
