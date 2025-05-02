

import { useRouteLoaderData } from 'react-router-dom';
import '../assets/Index.css';

export async function rootLoader() {
  return { login: true };
}

function HeaderRoot() {
  const loader = useRouteLoaderData('root') ;
  return (
    <header>
  {/* <nav className="nav-bar">
  </nav> */}
    </header>
  );
}

export default HeaderRoot