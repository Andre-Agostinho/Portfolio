

import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
 
 
export default function ProtectedRoute(){
    const userRole=localStorage.getItem("role");
 
    // if(userRole== 'manager'){
    //     return <Navigate to="/menuGestor" />;
    // }
    // else if (userRole== 'client'){
    //     return <Navigate to="/menu" replace/>;
    // }
    // else if (userRole== 'staff'){
    //     return <Navigate to="/kitchen" replace/>;
    // }
 
    return <Outlet/>
 
}


