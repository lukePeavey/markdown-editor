import React from 'react'
import PropTypes from 'prop-types'

/**
 * The top-level presentational component.
 */
export default function App({ state, actions }) {
  return <div>App stub</div>
}

App.propTypes = {
  state: PropTypes.shape({
    /** The current value of the text input */
    editorContent: PropTypes.string.isRequired,
  }),
  /** actions are functions that update state are run side effects */
  actions: {
    /** A function to update the editorContent state  */
    changeEditorContent: PropTypes.func.isRequired,
  },
}
