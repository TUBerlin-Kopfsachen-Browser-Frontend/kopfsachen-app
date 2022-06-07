import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Testpage from "./routes/testpage";
import Wiki from "./routes/wiki";
import MoodDiary from "./routes/MoodDiary";
import Resources from "./routes/Resources";
import EmergencyNumbers from "./routes/EmergencyNumbers";
<<<<<<< HEAD
import SafetyNet from "./routes/safetyNet";
=======
import Settings from "./routes/Settings";
import NewResources from "./routes/NewResources";
import Reframing from "./routes/Reframing";
import Reframing1 from "./routes/Reframing1";
import Profile from "./routes/Profile";
>>>>>>> wip-1


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="testpage" element={<Testpage />} />
        <Route path="mooddiary" element={<MoodDiary />} />
        <Route path="wiki" element={<Wiki />} />
        <Route path="resources" element={<Resources />} />
        <Route path="emergencynumbers" element={<EmergencyNumbers />} />
        <Route path="safetynet" element={<SafetyNet />} />
        <Route path="settings" element={<Settings />} />
        <Route path="newresources" element={<NewResources />} />
        <Route path="reframing" element={<Reframing />} />
        <Route path="reframing1" element={<Reframing1 />} />

        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
