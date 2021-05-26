import * as React from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";

// markup
const NotFoundPage = () => {
  return (
    <>
      <Seo />
      <main className="dark:bg-gray-900 bg-gray-100 text-gray-700 dark:text-gray-300 lowercase">
        <div className="max-w-2xl mx-6 md:ml-36">
          <div className="min-h-screen flex flex-col justify-center py-12">
            <h1 className="text-5xl sm:text-7xl">404</h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-500 dark:text-gray-400 mb-12">
              Page not found
            </h2>
            <Link
              tabIndex={0}
              className="text-red-600 dark:text-red-400 text-lg sm:text-xl"
              to="/"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
