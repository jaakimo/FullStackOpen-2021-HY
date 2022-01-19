import React from 'react';

const PersonForm = ({
  name, number, nameHandler, numberHandler,
}) => (
  <>
    <div>
      name:
      {' '}
      <input value={name} onChange={nameHandler} />
    </div>
    <div>
      number:
      <input type="tel" value={number} onChange={numberHandler} />
    </div>
  </>
);

export default PersonForm;
