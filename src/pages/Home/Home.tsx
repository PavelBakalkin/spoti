import { Route, Routes } from "react-router-dom";
import { MainInfo } from "../../components/MainInfo/MainInfo";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Artist } from "../../components/Artist/Artist";

export const Home = () => {
  return (
    <main className=" m-4 flex-auto">
      <div className="flex flex-col mx-auto lg:flex-row">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainInfo />} />
          <Route path="/artist-info/:name" element={<Artist />} />
        </Routes>
      </div>
    </main>
  );
};
