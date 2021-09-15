import React from 'react';

const FilterForm = ({ filter, handler }) => (
  <div>
    filter persons:
    {' '}
    <input value={filter} onChange={handler} />
  </div>
);
export default FilterForm;
