import * as React from "react";
import Seo from "../components/seo";
const fetchGithubProfile = async () => {
  try {
    const res = await fetch(
      "https://api.github.com/users/Afreda323/repos?sort=created&direction=desc"
    );
    const json = await await res.json();
    return json.slice(0, 21);
  } catch (e) {
    throw Error(e);
  }
};
const IndexPage = () => {
  React.useEffect(() => {
    fetchGithubProfile().then(console.log);
  }, []);
  return (
    <div className="opacity-80 lowercase">
      <Seo />
      <header className="pb-12">
        <h1>Anthony Freda</h1>
        <h2>
          <span className="text-gray-500">Lead Engineer</span>{" "}
          <span style={{ color: "rgb(194 32 46)" }}>@Movement Mortgage</span>
        </h2>
      </header>

      <main>
        <section>
          <h2 className="mb-4 line-text text-gray-500">About Me</h2>
          <p>
            Node JS framework that a generator. D3. Although there are strong
            outward similarities between JavaScript program could also be such
            as query language for automating tedious and display animated 3D
            computer graphics on the framework for Test-Driven Development.
            Yandex for dynamic web. Hoisting is by Microsoft for dynamic nature,
            the language.
          </p>
          <p>Things I Like:</p>
          <ul className="ml-4 list-disc list-inside">
            <li>Task</li>
            <li>Task</li>
            <li>Task</li>
            <li>Task</li>
            <li>Task</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 line-text text-gray-500">Experience</h2>
          <p>
            Node JS framework that a generator. D3. Although there are strong
            outward similarities between JavaScript program could also be such
            as query language for automating tedious and display animated 3D
            computer graphics on the framework for Test-Driven Development.
            Yandex for dynamic web. Hoisting is by Microsoft for dynamic nature,
            the language.
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
        <section>
          <h2 className="mb-4 line-text text-gray-500">Projects</h2>
          <p>
            Node JS framework that a generator. D3. Although there are strong
            outward similarities between JavaScript program could also be such
            as query language for automating tedious and display animated 3D
            computer graphics on the framework for Test-Driven Development.
            Yandex for dynamic web. Hoisting is by Microsoft for dynamic nature,
            the language.
          </p>
          <ul className="ml-2 list-disc list-inside">
            <li>hello</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-4 line-text text-gray-500">Get In Touch</h2>
          <ul className="ml-2 list-disc list-inside">
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default IndexPage;
