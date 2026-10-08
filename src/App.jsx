import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Academics from "./pages/Academics";
import Assignments from "./pages/Assignments";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import Announcements from "./pages/Announcements";
import Timetable from "./pages/Timetable";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">

        <Sidebar />

        <div className="main-section">

          <Header />

          <main className="main-content">

            <Routes>

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/academics" element={<Academics />} />

              <Route path="/assignments" element={<Assignments />} />

              <Route path="/events" element={<Events />} />

              <Route path="/clubs" element={<Clubs />} />

              <Route
                path="/announcements"
                element={<Announcements />}
              />

              <Route path="/timetable" element={<Timetable />} />

              <Route path="/resources" element={<Resources />} />

              <Route path="/profile" element={<Profile />} />

              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />

            </Routes>

          </main>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;