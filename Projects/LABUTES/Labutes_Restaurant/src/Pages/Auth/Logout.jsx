
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export default function Logout(){
 
    const navigate = useNavigate();
    localStorage.clear();
 
    useEffect(()=>{
        localStorage.clear();
        navigate('/');
    },
[navigate]);
 
   
 
    return(
        <div>Logging Out...</div>
    );
}