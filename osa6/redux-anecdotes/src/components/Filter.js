import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    props.setFilter(e.target.value)
  }
  const style = {
    marginBottom: '10px',
  }

  return (
    <div>
      filter <input style={style} onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
