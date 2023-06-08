import { useEffect } from "react";
import {
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from "../../constants/api-constants";
import { useAppDispatch } from "../../store/hooks";
import { setToken } from "../../store/Slices/loginSlice";

export const LogIn = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      //@ts-ignore
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      dispatch(setToken(token));
    }
  }, []);

  return (
    <div>
      <header className="flex justify-center items-center h-screen">
        <button className="bg-volume w-56 h-16 py-2 px-5 rounded-2xl cursor-default">
          <a
            className="font-semibold text-center text-2xl !leading-3"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spoti
          </a>
        </button>
      </header>
    </div>
  );
};
