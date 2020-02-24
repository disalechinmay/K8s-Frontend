import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Skeleton from "./components/Skeleton";
import * as serviceWorker from "./serviceWorker";
import "./assets/styles/Skeleton.css";
import "./assets/styles/common/LoadingPage.css";
import "./assets/styles/common/SmallLoadingPage.css";
import "./assets/styles/common/ErrorPage.css";
import "./assets/styles/common/SmallErrorPage.css";
import "./assets/styles/common/Cards.css";
import "./assets/styles/common/Labels.css";
import "./assets/styles/common/JsonEditor.css";
import "./assets/styles/SearchPage/SearchPage.css";
ReactDOM.render(<Skeleton />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
