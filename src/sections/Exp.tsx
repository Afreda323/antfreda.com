import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import { Theme } from "../theme";
import { H3 } from "../components/Text";
import Timeline, { Job } from "../components/Timeline";

const JOBS: Array<Job> = [
  {
    company: "Diligent",
    companyLink: "https://diligent.com/",
    title: "Software Engineer",
    start: "December 2019",
    end: "Now",
    tasks: [
      "More details coming soon...",
      "See other jobs for exp.",
    ],
  },
  {
    company: "Bank of America",
    companyLink: "https://bankofamerica.com",
    title: "Assistant Vice President; Software Engineer",
    start: "July 2017",
    end: "December 2019",
    tasks: [
      "Architected front end application scaffold/pipeline and UI component library using React and Typescript.",
      "Developed workflow automation web applications for internal Info-Security teams.",
      "Worked closely with customers to gather requirements and ensure timely product delivery.",
      "Led development of Mattermost(Enterprise slack alternative) integrations across multiple applications/processes.",
      "Architected/developed applications using React, Redux and Redux Saga.",
      "Developed Backend APIs using Express/Koa and MongoDB/mySQL",
      "Worked in an agile environment leveraging sprints, TDD, Gitflow.",
    ],
  },
  {
    company: "Burke",
    companyLink: "https://burke.design",
    title: "Web Developer",
    start: "January 2017",
    end: "July 2017",
    tasks: [
      "Created responsive websites using HTML5, CSS3, JavaScript and PHP.",
      "Developed and maintained various projects using various CMS including Custom CMS, Wordpress, Drupal and Joomla.",
      "Worked with managers to create budget scopes for projects.",
      "Developed in-house web applications using ES6, Express and MongoDB.",
      "Developed applications for client database visualization.",
      "Developed job search React Native and Redux mobile application.",
    ],
  },
  {
    company: "Freelance",
    title: "Web Developer",
    start: "January 2015",
    end: "January 2017",
    tasks: [
      "Led the development of client sites using HTML/CSS and JavaScript.",
      "Developed web applications using React/Node.js stack.",
      "Developed mobile applications using React Native.",
      "Developed RESTful API’s using Express and MongoDB.",
    ],
  },
];

function Exp() {
  return (
    <Wrapper id="exp">
      <Inner>
        <H3 block>Experience</H3>
        <br />
        <br />
        <Timeline exp={JOBS} />
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 100px 30px 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: Theme }) => `
    background: ${get(theme, "palette.gradients.linear", "")};
    @media (max-width: ${get(theme, "breakpoints.small", "700px")}) {
      padding: 100px 15px 100px;
  }
  `}
`;

const Inner = styled.div`
  width: 70%;
  ${({ theme }: { theme: Theme }) => `
        @media (max-width: ${get(theme, "breakpoints.medium", "1200px")}) {
            width: 80%;
        }
        @media (max-width: ${get(theme, "breakpoints.small", "700px")}) {
            width: 100%;
        }
    `}
`;

export default Exp;
