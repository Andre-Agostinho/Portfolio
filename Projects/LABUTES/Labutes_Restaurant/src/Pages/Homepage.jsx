
// ********************************************************************
// Página inicial do site

import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";


export function rootLoader() {
    return { login: true }; // Or dynamically set based on app state.
  }


export default function HomePage () {

    const loader = useRouteLoaderData('root') ;
    const location = useLocation();
    const message = location.state?.message;
    // console.log('o token é ' + localStorage.getItem('token'));
    // console.log('o role é ' + localStorage.getItem('role'));
    const position = localStorage.getItem('role');
    // console.log(position);

return (
<div>
  <div id="homeHeader">  
  <h1> Welcome to <br/>Labutes Restaurant</h1>
  </div> <br/>
  <div id="div1Home">
  <h2>To our new costumers, signup first to see the Menu.</h2>
  <Link to="signup"><button>Register</button></Link>
  </div> <br/>

  <hr size="10" color="black"></hr>

  <div id="div2Home">
  <h3>If you are a Regular... <br/> Great to see you again. <br/> Login and start ordering, the Kitchen staff is waiting you 😊.</h3>
  {!loader.login && <p> <Link to="Login"> <button>Login</button> </Link> </p>}
  {loader.login && <p> <Link to="/logout"><button>Logout</button></Link>  </p>}
  {loader.login && position == 'manager' && <p> <Link to="/Menu"><button>Show Menu</button></Link>  </p>}
  {loader.login && position == 'manager' && <p> <Link to="/menuGestor"><button>Management Menu - Add/Remove Dishes</button></Link>  </p>}
  {loader.login && position == 'manager' && <p> <Link to="/kitchen"><button>Kitchen - Current orders</button></Link>  </p>}
  {loader.login && position == 'client' && <p> <Link to="/Menu"><button>Click Here To See the Menu and Order</button></Link>  </p>}
  {loader.login && position == 'staff' && <p> <Link to="/kitchen"><button>Kitchen Orders</button></Link>  </p>}
  </div>

  {message && <div>{message}</div>}
</div>
)
}

