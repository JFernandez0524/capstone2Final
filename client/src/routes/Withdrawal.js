import React from 'react';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { Link } from 'react-router-dom';

export default function Withdrawal() {
  const [amount, setAmount] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      const newBalance = userBalance - Number(amount);
      if (newBalance > 0) {
        fetch(`/account/update/${auth.currentUser.email}/${newBalance}`)
          .then((response) => response.json)
          .then((data) => {
            console.log(data);
            setAmount('');
          });
      } else {
        setErrorMessage('Balance Can Not Be Negative');
        setAmount('');
      }
    } else {
      return console.log('Number Needs to be less than 0');
    }
  }

  return (
    <>
      <Card
        color={'success'}
        header={'Withdrawal'}
        title={isLoggedIn && 'How Much Would You Like to Withdraw?'}
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
              <Link to={'/login'}>Login To Make A Withdrawal </Link>
            </button>
          )
        }
      />
      {errorMessage && (
        <div class='alert alert-danger' role='alert'>
          {errorMessage}
        </div>
      )}
    </>
  );
}
