import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAccInfo } from "../../store/Slices/loginSlice";

export const Sidebar = () => {
  const acc = useAppSelector((state) => state.logIn.accInfo);
  const logInToken = useAppSelector((state) => state.logIn.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchAccInfo({
        token: logInToken ? logInToken : "",
      })
    );
  }, []);

console.log(acc)

  return (
    <div className="lg:w-1/5 bg-def-block p-8 rounded-2xl">
      {acc ? acc.display_name : ""}
    </div>
  );
};
