import { Route, Routes } from "react-router";
import { CurrentToolCheckContextWrapper } from "./context/currentToolCheckContext";

import Header from "./components/header/header";
import Dashboard from "./pages/dashboard/dashboard";
import Toolbox from "./pages/toolbox/toolbox";
import Checkout from "./pages/checkout/checkout";
import Report from "./pages/report/report";
import Footer from "./components/footer/footer";
import Settings from "./pages/settings/settings";
import NewUserModal from "./components/newUserModal/newUserModal";
import Background from "./components/background/background";

const App = () => {
  return (
    <div className="App">
      <Background />
      <NewUserModal />
      <div className="wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/toolbox/:url"
              element={
                <CurrentToolCheckContextWrapper>
                  <Toolbox />
                </CurrentToolCheckContextWrapper>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/report/:uid" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
