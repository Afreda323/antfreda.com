import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const seo = {
    title: title || site.siteMetadata.defaultTitle,
    description: description || site.siteMetadata.defaultDescription,
    url: `${site.siteMetadata.siteUrl}${pathname}`,
    twitterUsername: site.siteMetadata.twitterUsername,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags  */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />

      {/* Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />

      {/* Twitter  */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content={seo.twitterUsername} />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cabin&family=Playfair+Display:wght@500&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};
export default SEO;
const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        twitterUsername
      }
    }
  }
`;
SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  article: PropTypes.bool,
};
SEO.defaultProps = {
  title: null,
  description: null,
  article: false,
};
