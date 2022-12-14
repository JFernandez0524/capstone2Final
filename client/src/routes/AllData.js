import React from 'react';
// import UserContext from '../context';
import { useEffect, useState } from 'react';

export function AllData() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/account/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  return (
    <>
      <h1>AllData Page</h1>
      {data}
    </>
  );
}
