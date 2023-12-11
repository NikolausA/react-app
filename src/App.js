// весь код в файле App.js написан в декларативном стиле
import logo from "./logo.svg";
import "./App.css";
import { Year } from "./components/CurrentYear";
import { createElement } from "react";

console.log(logo);

const App = ({ logo }) => {
  return createElement(
    "div",
    { className: "App" },
    createElement(
      "header",
      { className: "App-header" },
      createElement("img", {
        className: "App-logo",
        src: { logo },
        alt: "logo",
      }),
      createElement(
        "p",
        null,
        "Edit",
        createElement("code", null, "src/App.js"),
        " and save to reload."
      ),
      createElement(
        "a",
        {
          className: "App-link",
          href: "https://reactjs.org",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        "Learn React"
      )
    )
  );
  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit <code>src/App.js</code> and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //     <Year />
  //   </header>
  // </div>
};

export default App;
