import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setLoading] = useState(true);

  const refresh = useRefreshToken();
  const { auth } = useAuth();
const[persist]=useLocalStorage('persist',false);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(auth?.accessToken);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    console.log(`persist: ${persist}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>{!persist 
        ? <Outlet /> 
        : isLoading 
        ? <p>is Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
