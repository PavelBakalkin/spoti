import React from "react";
import "./App.css";
import { Header } from "../components/Header/Header";
import { Home } from "./Home/Home";
import { Footer } from "../components/Footer/Footer";
import { LogIn } from "../components/LogIn/LogIn";
import { useAppSelector } from "../store/hooks";

function App() {
  const logInToken = useAppSelector((state) => state.logIn.token);
  console.log(logInToken);
  return (
    <div className="min-h-[100%] flex flex-col">
      {logInToken ? (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      ) : (
        <LogIn />
      )}
    </div>
  );
}

export default App;
