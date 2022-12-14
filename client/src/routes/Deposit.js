import React from 'react';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      setIsLoggedIn(true);
      const email = auth.currentUser.email;
      const url = `/account/find/${email}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          data.map((user) => setUserBalance(user.balance));
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, [userBalance]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(amount);
    if (amount > 0) {
      fetch(
        `/account/update/${auth.currentUser.email}/${userBalance +
          Number(amount)}`
      )
        .then((response) => response.json)
        .then((data) => {
          console.log(data);
          setAmount('');
        });
    }
  }

  return (
    <>
      <Card
        color={'success'}
        header={'Deposit'}
        title={isLoggedIn && 'How Much Would You Like to Deposit?'}
        body={
          auth.currentUser ? (
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='amount' className='form-label'>
                  Enter Amount
                </label>
                <input
                  type='number'
                  min='0'
                  className='form-control'
                  value={Number(amount)}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          ) : (
            <button className='text-bg-light'>
              <Link to={'/login'}>Login To Make A Deposit </Link>
            </button>
          )
        }
      />
    </>
  );
}
