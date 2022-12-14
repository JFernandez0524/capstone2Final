import React from 'react';
import { Form } from 'react-router-dom';
import { useState } from 'react';

export default function FormComponent(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    if (props.login) {
      console.log(props.email);
      console.log(props.address);
    }
    console.log('formCubmitters');
  }

  return (
    <Form onSubmit={handleSubmit}>
      {props.name && (
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            {props.name}
          </label>
          <input
            type='text'
            className='form-control'
            value={name}
            name='name'
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
      )}
      {props.email && (
        <>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              {props.email}
            </label>
            <input
              type='email'
              className='form-control'
              value={email}
              name='email'
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
        </>
      )}

      {props.password && (
        <>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              {props.password}
            </label>
            <input
              type='password'
              className='form-control'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
        </>
      )}
      <input type='submit' value='Submit' />
    </Form>
  );
}
