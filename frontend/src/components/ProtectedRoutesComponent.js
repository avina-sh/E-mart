import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";

import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage";

const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
     let cancel=false
     axios.get("/api/get-token").then(function (data) {
        console.log('data')
        console.log(data)
        if(cancel) return
        if (data.data.token) {
            setIsAuth(data.data);
        }
        return isAuth;
     }) 
     return () => { 
        cancel = true;
      }
  }, [])

  console.log('isAuth')
  console.log(isAuth)

  if (isAuth === undefined) return <LoginPage />;

  return isAuth && admin && isAuth.isAdmin !== true ? (
       <Navigate to="/login" />
  ) : isAuth && admin ?(
      <Outlet />
  ) : isAuth && !admin ? (
      <>
      <UserChatComponent />
      <Outlet />
      </>
  ) : (
       <Navigate to="/login" />
  )
};

export default ProtectedRoutesComponent;
