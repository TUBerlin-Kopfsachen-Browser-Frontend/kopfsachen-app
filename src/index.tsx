import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wiki from "./routes/wiki";
import MoodDiary from "./routes/MoodDiary";
import Resources from "./routes/Resources";
import EmergencyNumbers from "./routes/EmergencyNumbers";
import SafetyNet from "./routes/safetyNet";
import Settings from "./routes/Settings";
import NewResources from "./routes/NewResources";
import Reframing from "./routes/Reframing";
import Reframing1 from "./routes/Reframing1";
import Reframing2 from "./routes/Reframing2";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Neutral1 from "./routes/Neutral1";
import Optimism from "./routes/Optimism";
import Optimism1 from "./routes/Optimism1";
import Optimism2 from "./routes/Optimism2";
import Optimism3 from "./routes/Optimism3";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="mooddiary" element={<MoodDiary />} />
          <Route path="wiki" element={<Wiki />} />
          <Route path="resources" element={<Resources />} />
          <Route path="emergencynumbers" element={<EmergencyNumbers />} />
          <Route path="safetynet" element={<SafetyNet />} />
          <Route path="settings" element={<Settings />} />
          <Route path="newresources" element={<NewResources />} />
          <Route path="reframing" element={<Reframing />} />
          <Route path="reframing1" element={<Reframing1 />} />
          <Route path="reframing2" element={<Reframing2 />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="neutral1" element={<Neutral1 />} />
          <Route path="optimism" element={<Optimism />} />
          <Route path="optimism2" element={<Optimism2 hours={0} minutes={10} seconds={0} />} />
          <Route path="optimism3" element={<Optimism3 />} />
          <Route path="optimism1" element={<Optimism1 />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
