import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Header/Header";
import { Home } from "./Home/Home";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import { AuthProvider } from "./contexts/AuthProvider";
import { MyProfile } from "./MyProfile/MyProfile";
import { CheckStatus } from "./CheckStatus/CheckStatus";
import { Footer } from "./Footer/Footer,";
import { CreateOrder } from "./CreateOrder/CreateOrder";
import "./index.scss";

const rootElement = document.getElementById("root");
render(
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="checkstatus" element={<CheckStatus />} />
        <Route path="createorder" element={<CreateOrder />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>,

  rootElement
);
