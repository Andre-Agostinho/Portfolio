
// ********************************************************************
// pagina do Gestor (manager), para adicionar comida ao Menu

import GestaoMenu from "../components/GestaoMenu";

const message = location.state?.message;
console.log(localStorage.getItem('role'));

function IndexGestor () {
  return(
   <div>

   <GestaoMenu/>
   {message && <div>{message}</div>}
   </div>
  );
  }


  export default IndexGestor;