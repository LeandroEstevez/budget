import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const theme = createTheme({
//   palette: {
//     type: "light",
//     primary: {
//       main: "#639591",
//       light: "#9f868d",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//     background: {
//       default: "#363e51",
//       paper: "#eef0e8",
//     },
//     text: {
//       primary: "#eef0e8",
//       secondary: "#363e51",
//     },
//   },
//   typography: {
//     fontWeightBold: 700,
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
