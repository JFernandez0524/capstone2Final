import React from 'react';
import Card from '../components/Card';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function CreateAccount() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Card
        color='primary'
        header='Create Account'
        body={
          loggedIn ? (
            <CreateMsg setLoggedIn={setLoggedIn} />
          ) : (
            <CreateForm setLoggedIn={setLoggedIn} />
          )
        }
      />
    </>
  );
}

function CreateForm({ setLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('name: ' + name);
    console.log('email: ' + email);
    console.log('password: ' + password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user.email);
      // if there's a logged in user call create account route
      if (auth.currentUser) {
        //Every new user starts with 0 balance
        const url = `http://localhost:3001/account/create/${name}/${email}/${password}/0`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
        })();
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      setErrorMessage(errorMessage);
      clearForm();
      return;
    }

    setLoggedIn(true);
    clearForm();
  }

  function clearForm() {
    setEmail('');
    setName('');
    setPassword('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            aria-describedby='emailHelp'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value.toString())}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type='submit' className='btn btn-light'>
          Submit
        </button>
      </form>

      {errorMessage && (
        <div className='alert alert-danger' role='alert'>
          {errorMessage}
        </div>
      )}
    </>
  );
}

function CreateMsg({ setLoggedIn }) {
  return (
    <>
      <h5>Success!</h5>
      <button
        className='btn btn-light'
        type='submit'
        onClick={() => setLoggedIn(false)}>
        Create Another Account
      </button>
    </>
  );
}
