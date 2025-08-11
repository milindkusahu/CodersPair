import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ThemeSwitcher from "./components/ThemeSwitcher";
import LandingPage from "./components/LandingPage";
import PublicLayout from "./components/PublicLayout";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Public routes with NavBar + Footer */}
            <Route element={<PublicLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="theme" element={<ThemeSwitcher />} />
            </Route>

            {/* Protected Layout */}
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
