import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders the editor panel that contains text input
 */
export default class Editor extends React.Component {
  handleChange = (event) => {}

  render() {
    return <textarea id="editor" />
  }
}

Editor.propTypes = {
  /** The current content of the editor */
  inputValue: PropTypes.string.isRequired,
  /** Function to change the input value stored in state */
  changeEditorContent: PropTypes.func.isRequired,
}
