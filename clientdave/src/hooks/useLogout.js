import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return logout;
}

export default useLogout;
