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

  console.log(acc);

  return (
    <div className="lg:w-1/5 bg-def-block p-8 rounded-2xl">
      <div className="flex items-center">
        <div className="rounded-[50%] overflow-hidden w-10 h-10">
          <img
            className="object-cover w-full h-full"
            src={`${acc ? acc.images[0].url : ''}`}
            alt="acc"
          />
        </div>
        <p className="font-medium text-lg !leading-3 ml-2.5">
          {acc ? acc.display_name.toUpperCase() : ""}
        </p>
      </div>
    </div>
  );
};
