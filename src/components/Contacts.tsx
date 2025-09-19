import { Geist_Mono } from "next/font/google";
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";
const mono = Geist_Mono({ subsets: ["latin"] });

export default function ContactLinks() {
  return (
    <div className="flex flex-col gap-4.5">
      <a
        href="mailto:anthonyfreda323@gmail.com"
        className={`${mono.className} group inline-flex items-center justify-between rounded-md px-3.5 py-2
                    bg-black/40 ring-1 ring-white/10 text-zinc-300 hover:bg-white/5  hover:ring-cyan-500/30
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70`}
        aria-label="Email Anthony"
      >
        <span className="inline-flex items-center gap-4">
          <SiGmail className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
          <span>email</span>
        </span>
        <span
          aria-hidden
          className="text-zinc-500 transition-transform group-hover:translate-x-0.5 text-xl"
        >
          ↗
        </span>
      </a>

      <a
        href="https://www.linkedin.com/in/antfreda323"
        rel="me noopener noreferrer"
        target="_blank"
        className={`${mono.className} group inline-flex items-center justify-between rounded-md px-3.5 py-2 
                    bg-black/40 ring-1 ring-white/10 text-zinc-300 hover:bg-white/5  hover:ring-cyan-500/30
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70`}
        aria-label="Open LinkedIn profile"
      >
        <span className="inline-flex items-center gap-4">
          <SiLinkedin className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
          <span>linkedin</span>
        </span>
        <span
          aria-hidden
          className="text-zinc-500 transition-transform group-hover:translate-x-0.5 text-xl"
        >
          ↗
        </span>
      </a>

      <a
        href="https://github.com/Afreda323"
        rel="me noopener noreferrer"
        target="_blank"
        className={`${mono.className} group inline-flex items-center justify-between rounded-md px-3.5 py-2 
                    bg-black/40 ring-1 ring-white/10 text-zinc-300 hover:bg-white/5  hover:ring-cyan-500/30
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70`}
        aria-label="Open GitHub profile"
      >
        <span className="inline-flex items-center gap-4">
          <SiGithub className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
          <span>github</span>
        </span>
        <span
          aria-hidden
          className="text-zinc-500 transition-transform group-hover:translate-x-0.5 text-xl"
        >
          ↗
        </span>
      </a>
    </div>
  );
}
