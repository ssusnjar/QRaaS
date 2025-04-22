// import { lazy, Suspense } from "react";
// import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Form from './pages/Form';
import AboutUs from './pages/AboutUs';
import Cjenik from "./pages/CjenikPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />

        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
          path="/register"
          element={
             <Register />
          }
        />

        <Route
            path="/chat"
            element={<Chat />}
          />
        <Route
            path="/form"
            element={<Form />}
          />
        <Route
            path="/aboutUs"
            element={<AboutUs />}
          />
          <Route path="/cjenik/:id" element={<Cjenik />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
