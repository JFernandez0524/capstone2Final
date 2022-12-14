import React from 'react';
import Card from '../components/Card';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

export default function Logout() {
  const [errorMessage, setErrorMessage] = useState('');

  async function logout() {
    console.log('logged out! ');
    return await signOut(auth);
  }

  function handleClick(e) {
    try {
      logout();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <Card
        header={'Log Out'}
        color={'danger'}
        body={
          <button className='btn text-bg-dark' onClick={handleClick}>
            Log Out
          </button>
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
