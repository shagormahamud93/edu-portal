
import { useAppDispatch } from "../redux/hooks";
import { getLoginUserInfo } from "../redux/slices/userInfoSlice";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(getLoginUserInfo(null));
    toast.success("Logged out successfully!");
  };

  return { handleLogout };
};
