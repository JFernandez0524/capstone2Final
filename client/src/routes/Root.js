import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Root() {
  const [loggedInUser, setLoggedInUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (auth.currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setLoggedInUser(user.email);
      // ...
    } else {
      // User is signed out
      // ...

      setLoggedInUser(false);
    }
  });

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            Bad Bank
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='/'>
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'createAccount'}>
                  Create Account
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'login'}>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'deposit'}>
                  Deposit
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'withdrawal'}>
                  Withdrawal
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'balance'}>
                  Balance
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'alldata'}>
                  All Data
                </Link>
              </li>
              {loggedInUser ? (
                <li className='nav-item'>
                  <Link className='nav-link' to={'logout'}>
                    {' '}
                    Log Out
                  </Link>
                </li>
              ) : null}
            </ul>
            <div className='position-absolute top-0 end-0'>{loggedInUser}</div>
          </div>
        </div>
      </nav>
      <div id='outlet'>
        <Outlet />
      </div>
    </>
  );
}
