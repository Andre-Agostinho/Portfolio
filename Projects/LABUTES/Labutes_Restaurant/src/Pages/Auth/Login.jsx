

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../assets/auth.css'

export default function Login() {

  const [enteredValues, setEnteredValues] = useState ({
    email: '',
    password: '',
    role: 'client',
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    console.log(enteredValues);
    // const authData = enteredValues;
    // console.log (authData);
    fetch ('http://localhost:3010/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredValues),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message || "Failed to authenticate");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login Success:", data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role',data.role);
      switch(data.role) {
        case "manager":
          navigate("/menuGestor");
          break;
        case "staff":
          navigate("/kitchen");
          break;
        default:
          navigate("/menu");
      }
    })
    .catch((error) => alert("Login failed. Please try again."));
}
          

  function handleInputChange (identifier, value){
    setEnteredValues((prevValues)  => (
    {
      ...prevValues,
      [identifier]:value
    }
  ));
 }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={(event) => handleInputChange('email', event.target.value)} required
          value={enteredValues.email}/>
        </div>
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" onChange={(event) => handleInputChange('password', event.target.value)} required 
          value={enteredValues.password}/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">Role:</label>
        <select id="role" name="role" 
          onChange={(event) => handleInputChange('role', event.target.value)} required
          value={enteredValues.role}>
          <option value="client">Client</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <p className="form-actions">
        <button className="button" type='submit'>Login</button>
      </p>
    </form>
  );
}

