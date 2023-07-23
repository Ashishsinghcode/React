// import logo from './logo.svg';

import "./App.css";
import "./component/Navbar";

import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
// import About from "./component/About";
import { useState } from "react";
import Alert from "./component/Alert";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setmode] = useState("light");
  const [toggle, settoggle] = useState("Enable DarkMode ");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  const toggleMode = () => {
    if (mode === "dark") {
      setmode("light");
      settoggle("Enable DarkMode");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    } else {
      setmode("dark");
      settoggle("Enable LightMode");
      document.body.style.backgroundColor = "grey";
      showAlert("Dark mode has been enabled", "success");
    }
  };
  return (
    <>
      {/* <Router> */}
        <Navbar
          title="Textutils"
          abouttext="About text utils"
          mode={mode}
          toggleMode={toggleMode}
          toggleBtn={toggle}
        />
        <div className="container mt-3">
          <Alert alert={alert} />
          <TextForm heading="Enter the text for analyze" mode={mode} />
          {/* <Routes> */}
            {/* <Route
              index
              element={
                <TextForm heading="Enter the text for analyze" mode={mode} />
              }
            ></Route>
            <Route
              exact
              path="/"
              element={
                <TextForm heading="Enter the text for analyze" mode={mode} />
              }
            ></Route>
            <Route exact path="about" element={<About />}></Route>
          </Routes> */}
        </div>
      {/* </Router> */}

      {/* <About /> */}
    </>
  );
}

export default App;
