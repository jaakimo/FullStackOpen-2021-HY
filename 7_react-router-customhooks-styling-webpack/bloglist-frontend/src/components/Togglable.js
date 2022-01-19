import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })
  return (
    <div className="mb-2">
      <Button
        variant="success"
        style={hideWhenVisible}
        className="button-visibility"
        onClick={toggleVisibility}
      >
        {props.buttonLabel}
      </Button>

      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility}>
          close
        </Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'
export default Togglable
