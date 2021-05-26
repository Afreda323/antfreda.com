import * as React from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Seo from "../components/seo";
import Switch from "../components/Switch";

const DARK_MODE = "darkMode";
const getDarkMode = () => {
  const darkMode = localStorage.getItem(DARK_MODE);
  if (darkMode) {
    return JSON.parse(darkMode);
  }

  return true;
};

const IndexPage = () => {
  const [darkMode, setDarkMode] = React.useState(getDarkMode());
  React.useEffect(() => {
    document.querySelector("html").className = darkMode ? "dark" : "";
    localStorage.setItem(DARK_MODE, darkMode);
  }, [darkMode]);
  return (
    <>
      <Seo />
      <div className="fixed top-0 right-0">
        <Switch isToggled={darkMode} onClick={() => setDarkMode(!darkMode)} />
      </div>

      <div className="dark:bg-gray-900 bg-gray-100 text-gray-700 dark:text-gray-300 lowercase">
        <div className="max-w-2xl mx-6 md:ml-36">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
