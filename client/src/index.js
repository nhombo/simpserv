import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";


const rootElement = document.getElementById("root");
let render = () =>
  ReactDOM.render(
     <App />,
     
    rootElement
  );
if (module.hot) {
  module.hot.accept("./components/App", () => {
    setTimeout(render);
  });
  render();
}
