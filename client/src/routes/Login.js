import React from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Card from '../components/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        console.log(user.email);

        setSuccessMessage(true);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.code);
      setErrorMessage(true);
      return;
    }

    console.log(email, password);
  }

  return (
    <>
      <Card
        color={'secondary'}
        header={'Login'}
        body={
          auth.currentUser ? (
            "Success You're logged in"
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
              {}
            </form>
          )
        }
      />
      {successMessage && "Congratulations You're Logged in"}
      {errorMessage && 'Please Enter the correct Email and Password'}
    </>
  );
}
