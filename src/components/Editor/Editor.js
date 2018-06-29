import React from 'react'
import PropTypes from 'prop-types'
import './Editor.css'

/**
 * Renders the editor panel that contains text input
 */
export default class Editor extends React.Component {
  handleChange = (event) => {
    const value = event.target.value
    this.props.changeEditorContent(value)
  }

  render() {
    const { value } = this.props
    return (
      <section className="Editor split">
        <textarea id="editor" value={value} onChange={this.handleChange} />
      </section>
    )
  }
}

Editor.propTypes = {
  /** The current content of the editor */
  value: PropTypes.string.isRequired,
  /** Function to change the input value stored in state */
  changeEditorContent: PropTypes.func.isRequired,
}
