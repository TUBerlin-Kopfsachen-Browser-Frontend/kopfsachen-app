import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Wiki from "./routes/wiki";
import MoodDiary from "./routes/MoodDiary";
import Resources from "./routes/Resources";
import EmergencyNumbers from "./routes/EmergencyNumbers";
import SafetyNet from "./routes/safetyNet";
import Settings from "./routes/Settings";
import NewResources from "./routes/NewResources";
import ReframingPreview from "./routes/ReframingPreview";
import Reframing from "./routes/Reframing";
import Reframing1 from "./routes/Reframing1";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import Login from "./routes/Login";
import SocialSupportPreview from "./routes/SocialSupportPreview";
import SocialSupport from "./routes/SocialSupport";
import OptimismPreview from "./routes/OptimismPreview";
import OptimismX from "./routes/OptimismX";
import Optimism from "./routes/Optimism";
import Optimism1 from "./routes/Optimism1";
import SituationControlPreview from "./routes/SituationControlPreview";

import * as colors from "./color";
const { theme } = colors;

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript />
        <Routes>
          <Route path='/' element={<Navigate to='/home' />}/>
          <Route path="/home" element={<App />} />
          <Route path="mooddiary" element={<MoodDiary />} />
          <Route path="wiki" element={<Wiki />} />
          <Route path="resources" element={<Resources />} />
          <Route path="/resources/safetynet" element={<SafetyNet />} />
          <Route path="/resources/reframing-preview" element={<ReframingPreview />} />
          <Route path="/resources/reframing" element={<Reframing />} />
          <Route path="/resources/reframing1" element={<Reframing1 />} />
          <Route path="/resources/new" element={<NewResources />} />
          <Route path="/resources/optimism-preview" element={<OptimismPreview />} />
          <Route path="/resources/optimismX" element={<OptimismX />} />
          <Route path="/resources/optimism" element={<Optimism hours={0} minutes={10} seconds={0} />} />
          <Route path="/resources/optimism1" element={<Optimism1 />} />
          <Route path="/resources/socialsupport-preview" element={<SocialSupportPreview />} />
          <Route path="/resources/situationcontrol-preview" element={<SituationControlPreview />} />
          <Route path="/resources/socialsupport" element={<SocialSupport />} />
          <Route path="emergencynumbers" element={<EmergencyNumbers />} />
          {/* <Route path="settings" element={<Settings />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="neutral1" element={<SocialSupport1 />} /> */}
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
