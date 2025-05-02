
// ********************************************************************
// componentes do Root Layout do site


import { Outlet } from "react-router-dom";
import HeaderRoot from "./HeaderRoot";


export default function RootLayout () {
return (
<>
  <HeaderRoot/>
  <Outlet/>
</>
)
}