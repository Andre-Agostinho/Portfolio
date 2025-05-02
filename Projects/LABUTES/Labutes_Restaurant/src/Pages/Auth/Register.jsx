

import { useState } from 'react';
import '../../assets/auth.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);
  const navigate = useNavigate();
  
    function handleSubmit(event){
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries())
 
      if(data.password != data.confirmPassword){
        setPasswordsAreNotEqual(true);
        return;
      }
     
      const user = {
        email: data.email,
        password: data.password,
        firstName: data['first-name'],
        lastName: data['last-name'],
        role: "client",
        termsAccepted: data.terms === 'on',
      }
 
      const response = fetch("http://localhost:3010/signup",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user)
        }  
      )
   
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
     if ('client' == user.role) {
          navigate('/menu')
        };
    }
  
 
    return (
      <form onSubmit={handleSubmit}>
        <h1>Welcome aboard!</h1>
         <h3>We just need a little information</h3>
         <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
         </div>
 
        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required />
          </div>
          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              required
            />
            {passwordsAreNotEqual &&
            <div>Passwords must match</div>}
            </div>
          </div>
 
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name"
            required/>
          </div>
 
          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" required />
          </div>
        </div>
 
        <div className="control">
          <label htmlFor="phone">Role</label>
          <select id="role" name="role" required>
          <option value="client">Client</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input required type="checkbox" id="terms-and-conditions" name="terms" />
            I agree to the <Link to="/terms&conditions">Terms & Conditions</Link> 
          </label>
        </div>
 
        <p className="form-actions">
          <button type="submit" className="button">
            Sign up
          </button>
        </p>
        <Link to="/"> <button>Homepage</button> </Link>
      </form>
    );
  }





