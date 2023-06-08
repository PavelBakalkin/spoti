import { MainInfo } from "../../components/MainInfo/MainInfo";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const Home = () => {
  return (
    <main className=" m-4 flex-auto">
      <div className="flex flex-col mx-auto lg:flex-row">
        <Sidebar />
        <MainInfo />
      </div>
    </main>
  );
};
