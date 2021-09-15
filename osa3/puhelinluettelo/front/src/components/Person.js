/* eslint-disable react/button-has-type */
import React from 'react';

const Person = ({
  name, number, deleteHandler, id,
}) => (
  <tr>
    <td>{name}</td>
    <td>{number}</td>
    <button id={id} onClick={deleteHandler} name={name}>
      delete
    </button>
  </tr>
);
export default Person;
