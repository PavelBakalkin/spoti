import { setToken } from "../../store/Slices/loginSlice";
import { useAppDispatch } from "../../store/hooks";

export const Header = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setToken(""));
    window.localStorage.removeItem("token");
  };

  return (
    <header className="m-4 rounded-2xl py-8 px-5 relative z-10 bg-def-block">
      <nav className="flex mx-auto max-w-screen-2xl justify-between">
        <a
          data-animBio="text"
          href="/"
          className="font-semibold text-center text-3xl !leading-3"
        >
          Spoti
        </a>
        <button className="ease-out duration-500 mx-2 font-medium text-lg !leading-3 hover:text-[#ffffff] hover:text-xl" onClick={logout}>Log out</button>
      </nav>
    </header>
  );
};
