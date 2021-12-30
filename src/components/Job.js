import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Job display component
 * @param {{
 *   title: string,
 *   company: {
 *     name: string,
 *     website: string
 *   },
 *   start: string,
 *   end: string,
 *   achievements: string[]
 * }} props
 */
export default function Job(props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`${props.achievements.length ? "mb-12" : "sm:mb-6 mb-2"}`}>
      <h2 className="leading-none sm:leading-tight md:leading-tight text-xl sm:text-2xl md:text-3xl text-slate-500 dark:text-slate-400">
        {props.title}
        <a
          tabIndex={0}
          className="text-rose-600 dark:text-rose-400 block sm:inline-block"
          target="_blank"
          rel="noopener noreferrer"
          href={props.company.website}
        >
          @{props.company.name}
        </a>
      </h2>
      <p className="text-sm sm:text-lg mb-4 font-mono tracking-tighter">
        {props.start} – {props.end}
      </p>
      <ul className="mb-4">
        {props.achievements
          .slice(0, expanded ? props.achievements.length : 4)
          .map((ach, i) => (
            <li
              className="mr-12 mb-4 sm:text-lg"
              key={`${props.company.name}_ach_${i}`}
            >
              <span className="text-rose-600 dark:text-rose-400 inline-block mr-2">
                &#187;
              </span>
              {ach}
            </li>
          ))}
      </ul>
      {props.achievements.length > 4 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-rose-600 dark:text-rose-400 sm:inline-block block mb-2 sm:mb-2 mr-12"
          >
            {expanded ? "view less" : "view more"}
          </button>
        </div>
      )}
    </div>
  );
}

Job.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }),
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  achievements: PropTypes.arrayOf(PropTypes.string),
};
