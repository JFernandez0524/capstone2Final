import React from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Balance() {
  const [balance, setBalance] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (auth.currentUser) {
      setIsLoggedIn(true);
      const url = `/account/find/${user.email}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          data.map((user) => setBalance(user.balance));
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      <Card
        color={'warning'}
        header={'Balance'}
        body={
          isLoggedIn ? (
            'User Balance: ' + balance
          ) : (
            <button className='text-bg-light'>
              <Link to={'/login'}>Login To Check Balance </Link>
            </button>
          )
        }
      />
    </>
  );
}
