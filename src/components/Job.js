import React from "react";
import PropTypes from "prop-types";

export default function Job(props) {
  return (
    <div>
      <h2 className="leading-tight sm:leading-tight md:leading-tight text-xl sm:text-2xl md:text-3xl text-gray-500 dark:text-gray-400">
        {props.title}
        <a
          tabIndex={0}
          className="text-red-600 dark:text-red-400"
          target="_blank"
          rel="noopener noreferrer"
          href={props.company.website}
        >
          @{props.company.name}
        </a>
      </h2>
      <p className="sm:text-lg mb-4">
        {props.start} – {props.end}
      </p>
      <ul className="mb-4">
        {props.achievements.map((ach, i) => (
          <li className="mr-12 sm:text-lg" key={`${props.company.name}_ach_i`}>
            <span className="text-red-600 dark:text-red-400 inline-block mr-2">
              &#187;
            </span>
            {ach}
          </li>
        ))}
      </ul>
      <div className="mb-6">
        <button className="text-red-600 dark:text-red-400 sm:inline-block block mb-2 sm:mb-2 mr-12">
          Expand
        </button>
      </div>
    </div>
  );
}

Job.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }),
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  achievements: PropTypes.arrayOf(PropTypes.string),
};
