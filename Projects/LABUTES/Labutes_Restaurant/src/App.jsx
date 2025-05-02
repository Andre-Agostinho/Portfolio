
// import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import ErrorPage from './Pages/ErrorPage';
import HomePage from './Pages/Homepage';
import IndexMenu from './Pages/IndexMenu';
import IndexGestor from './Pages/IndexGestor';
// import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import Login from './Pages/Auth/Login';
import Logout from './Pages/Auth/Logout';
import Register from './Pages/Auth/Register';
import TermsConditions from './Pages/Terms&Conditions';
import IndexKitchen from './Pages/IndexKitchen';



const ROUTER = createBrowserRouter ([
{
  path: '/', element: <RootLayout/>,
  errorElement: <ErrorPage/>,
  id:'root',
  loader: () => {
  return { login: localStorage.getItem('token') ? true :
    false};
},
children:[
    {path: '/', element: <HomePage/>},
    {path: '/login', element: <Login/>},
    {path: '/logout', element: <Logout/>},
    {path: '/signup', element: <Register/>},
    {path: '/terms&conditions', element: <TermsConditions/>},
    {path: '/menuGestor', element: <IndexGestor/>, },
    {path: '/menu',element: <IndexMenu/>, },
    {path: '/kitchen',element: <IndexKitchen/>, },
    ],
  }
])







function App() {

  return (
    <>
    <RouterProvider router={ROUTER}/>
    </>
  )
}

export default App;
