import React from 'react'
import PropTypes from 'prop-types'
import Preview from '../Preview'
import Editor from '../Editor'
import './App.css'

/**
 * The top-level presentational component.
 */
export default function App({ state, changeEditorContent }) {
  return (
    <div className="App">
      <div className="App-layout split">
        <Preview markdown={state.editorContent} />
        <Editor
          value={state.editorContent}
          changeEditorContent={changeEditorContent}
        />
      </div>
    </div>
  )
}

App.propTypes = {
  state: PropTypes.shape({
    /** The current value of the text input */
    editorContent: PropTypes.string.isRequired,
  }),
  /** actions are functions that update state are run side effects */
  changeEditorContent: PropTypes.func.isRequired,
}
