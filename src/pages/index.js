import * as React from "react";
import Seo from "../components/seo";
import Switch from "../components/Switch";
import Job from "../components/Job";
import data from "../data.json";

const IndexPage = () => {
  const skillsHalf = Math.ceil(data.skills.length / 2);
  const skillsCol1 = data.skills.slice(0, skillsHalf);
  const skillsCol2 = data.skills.slice(skillsHalf);

  return (
    <div className="dark:bg-slate-900 dark:bg-opacity-100 bg-slate-300 bg-opacity-75 text-slate-700 dark:text-slate-300 tracking-widest lowercase">
      <Seo />
      <Switch />

      <div className="max-w-2xl mx-6 md:ml-36">
        {/* Header */}
        <header className="min-h-screen flex flex-col justify-center py-12">
          <h1 className="text-4xl sm:text-7xl">Anthony Freda</h1>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl text-slate-500 dark:text-slate-400 mb-8`}
          >
            <span>{data.jobs[0].title}</span>
            <a
              tabIndex={0}
              className="text-rose-600 dark:text-rose-400"
              target="_blank"
              rel="noopener noreferrer"
              href={data.jobs[0].company.website}
            >
              @{data.jobs[0].company.name}
            </a>
          </h2>
          <p className={`sm:text-lg leading-relaxed sm:leading-loose mb-12`}>
            I am a self-taught senior software engineer based in Charlotte,
            north carolina. I have multiple years of experience working in
            various environments from small local agencies to Fortune 25
            companies.
          </p>
          <p className="text-lg sm:text-xl">
            <a
              tabIndex={0}
              className="text-rose-600 dark:text-rose-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
              href="#about"
            >
              About me
            </a>
            <a
              tabIndex={0}
              className="text-rose-600 dark:text-rose-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
              href="#experience"
            >
              Experience
            </a>
            <a
              tabIndex={0}
              className="text-rose-600 dark:text-rose-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
              href="#contact"
            >
              Contact
            </a>
          </p>
        </header>
        {/* Main */}
        <main>
          {/* About */}
          <section
            id="about"
            className="min-h-screen flex flex-col justify-center"
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl leading-tight text-slate-500 dark:text-slate-400 mb-8 line-text`}
            >
              About Me
            </h2>
            <p className={`sm:text-lg leading-relaxed sm:leading-loose mb-12`}>
              I specialize in the development of scalable web applications. I
              spend most of my free time researching and experimenting with new
              technology. when not sitting at my computer writing code, I can be
              found at one of the many breweries in charlotte, at the gym, or on
              my couch watching some netflix.
            </p>
            <h3 className="text-xl mb-2 text-slate-500 dark:text-slate-400">
              Some of the Tools I'm Using:
            </h3>
            <div className="md:flex">
              <div>
                {skillsCol1.map((skill) => (
                  <p key={`skill_${skill}`} className="mr-12 sm:text-lg">
                    <span className="text-rose-600 dark:text-rose-400 inline-block mr-2">
                      &#187;
                    </span>
                    {skill}
                  </p>
                ))}
              </div>
              <div>
                {skillsCol2.map((skill) => (
                  <p key={`skill_${skill}`} className="mr-12 sm:text-lg">
                    <span className="text-rose-600 dark:text-rose-400 inline-block mr-2">
                      &#187;
                    </span>
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </section>
          {/* Experience */}
          <section
            id="experience"
            className="min-h-screen flex flex-col justify-center"
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl leading-tight text-slate-500 dark:text-slate-400 mb-8 line-text`}
            >
              Experience
            </h2>
            <p className={`sm:text-lg leading-relaxed sm:leading-loose mb-12`}>
              My career has placed me at some great places, and has given me the
              chance to work with and learn from some awesome people. I've been
              lucky enough to have had the opportunity to work with both battle
              hardened software and continue to to stay on the cutting edge with
              new up and coming technology.
            </p>
            {data.jobs.map((job) => (
              <Job key={`${job.title}_${job.company.name}`} {...job} />
            ))}
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="min-h-screen flex flex-col justify-center"
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl leading-tight text-slate-500 dark:text-slate-400 mb-8 line-text`}
            >
              Contact Me
            </h2>
            <p>
              {data.links.map((link) => (
                <a
                  key={`link_${link.label}`}
                  tabIndex={0}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 dark:text-rose-400 block mb-2 md:mb-4 mr-12"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </p>
          </section>
        </main>
        {/* Footer */}
        <footer>
          <p
            className={`text-sm sm:text-base leading-relaxed sm:leading-loose pb-2 text-slate-500 dark:text-slate-400`}
          >
            &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default IndexPage;
