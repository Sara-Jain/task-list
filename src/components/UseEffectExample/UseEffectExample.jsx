/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function UseEffectExample() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  useEffect(() => {
    console.log('useEffect with no dependency array argument');
  });

  useEffect(() => {
    console.log('useEffect with no dependency array argument. Value of counter1: ', counter1);
  });

  useEffect(() => {
    console.log('useEffect with empty dependency array argument');
  }, []);

  useEffect(() => {
    console.log('useEffect with dependency array argument.Value of counter1: ', counter1);
  }, [counter1]);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setCounter1((prevState) => prevState + 1)}>Increment counter1</button>
        <span>
          Counter 1:
          {' '}
          {counter1}
        </span>
      </div>
      <div>
        <button type="button" onClick={() => setCounter2((prevState) => prevState + 1)}>Increment counter2</button>
        <span>
          Counter 2:
          {' '}
          {counter2}
        </span>
      </div>
    </div>
  );
}

export default UseEffectExample;
