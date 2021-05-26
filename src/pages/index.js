import * as React from "react";
import Seo from "../components/seo";

const pBase = "sm:text-lg sm:leading-relaxed";
const h2Base =
  "text-2xl sm:text-3xl md:text-4xl leading-tight text-gray-500 dark:text-gray-400";

const IndexPage = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  React.useEffect(() => {
    document.querySelector("html").className = darkMode ? "dark" : "";
  }, [darkMode]);
  return (
    <div className="dark:bg-gray-900 text-gray-700 dark:text-gray-300 lowercase">
      <div className="max-w-2xl mx-6 md:ml-36">
        <Seo />
        <input
          type="checkbox"
          onClick={() => setDarkMode(!darkMode)}
          checked={darkMode}
        />
        <header className="pb-12 min-h-screen flex flex-col justify-center py-12">
          <h1 className="text-5xl sm:text-7xl">Anthony Freda</h1>
          <h2 className={`${h2Base} mb-12`}>
            <span>Lead Engineer</span>{" "}
            <a
              className="text-red-600 dark:text-red-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Movement Mortgage
            </a>
          </h2>
          <p className={`${pBase} mb-12`}>
            Node JS framework that a generator. D3. Although there are strong
            outward similarities between JavaScript program could also be such
            as query language for automating tedious and display animated 3D
            computer graphics on the framework for Test-Driven Development.
          </p>
          <p className="text-lg sm:text-xl">
            <a
              className="text-red-600 dark:text-red-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
              href="#about"
            >
              About me
            </a>
            <a
              className="text-red-600 dark:text-red-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
              href="#experience"
            >
              Experience
            </a>
            <a
              className="text-red-600 dark:text-red-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
              href="#contact"
            >
              Contact
            </a>
          </p>
        </header>

        <main>
          <section
            id="about"
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className={`${h2Base} mb-4 line-text`}>About Me</h2>
            <p className={`${pBase} mb-12`}>
              Node JS framework that a generator. D3. Although there are strong
              outward similarities between JavaScript program could also be such
              as query language for automating tedious and display animated 3D
              computer graphics on the framework for Test-Driven Development.
              Yandex for dynamic web. Hoisting is by Microsoft for dynamic
              nature, the language.
            </p>
            <h3 className="text-xl mb-4 text-gray-500 dark:text-gray-400">
              Things I Like:
            </h3>
            <ul className="md:flex">
              <li className="mr-12 sm:text-lg">
                <span className="text-red-600 dark:text-red-400 inline-block mr-2">
                  &#187;
                </span>
                Task
              </li>
              <li className="mr-12 sm:text-lg">
                <span className="text-red-600 dark:text-red-400 inline-block mr-2">
                  &#187;
                </span>
                Task
              </li>
              <li className="mr-12 sm:text-lg">
                <span className="text-red-600 dark:text-red-400 inline-block mr-2">
                  &#187;
                </span>
                Task
              </li>
              <li className="mr-12 sm:text-lg">
                <span className="text-red-600 dark:text-red-400 inline-block mr-2">
                  &#187;
                </span>
                Task
              </li>
              <li className="mr-12 sm:text-lg">
                <span className="text-red-600 dark:text-red-400 inline-block mr-2">
                  &#187;
                </span>
                Task
              </li>
            </ul>
          </section>

          <section
            id="experience"
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className={`${h2Base} mb-4 line-text`}>Experience</h2>
            <p className={`${pBase}`}>
              Node JS framework that a generator. D3. Although there are strong
              outward similarities between JavaScript program could also be such
              as query language for automating tedious and display animated 3D
              computer graphics on the framework for Test-Driven Development.
              Yandex for dynamic web. Hoisting is by Microsoft for dynamic
              nature, the language.
            </p>
            <ul className="ml-2 list-disc list-inside">
              <li>
                Job
                <ul className="ml-4 list-disc list-inside">
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                </ul>
              </li>
              <li>
                Job
                <ul className="ml-4 list-disc list-inside">
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                </ul>
              </li>
              <li>
                Job
                <ul className="ml-4 list-disc list-inside">
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                </ul>
              </li>
              <li>
                Job
                <ul className="ml-4 list-disc list-inside">
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                  <li>Task</li>
                </ul>
              </li>
            </ul>
          </section>

          <section
            id="contact"
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className={`${h2Base} mb-4 line-text`}>Get In Touch</h2>
            <ul className="ml-2 list-disc list-inside">
              <li>Link</li>
              <li>Link</li>
              <li>Link</li>
            </ul>
          </section>
        </main>

        <footer>
          <p className={`${pBase}`}>&copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default IndexPage;
