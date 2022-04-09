import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary py-2 flex-row align-center">
      <div className="flex-row justify-space-between-lg justify-center align-center" style={{width:'100%'}}>
        <Link to="/" style={{padding: '15px'}}>
          <h1>Chorezy</h1>
        </Link>


        
        <nav className="text-center" style={{fontWeight: 'bold'}}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
