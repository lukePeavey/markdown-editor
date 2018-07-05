import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Preview from '../Preview'
import Editor from '../Editor'
import AppBar from '../AppBar'
import FileUploader from '../FileUploader'
import './App.css'

/**
 * The top-level presentational component.
 */
export default function App({ state, actions }) {
  const { activeView, isFileUploaderOpen } = state
  return [
    <div className="App" key="app">
      <AppBar {...state} actions={actions} />
      <div className={classNames('App-layout', activeView)}>
        {activeView !== 'editor' && <Preview {...state} actions={actions} />}
        {activeView !== 'preview' && <Editor {...state} actions={actions} />}
      </div>
    </div>,
    <FileUploader key="modal" open={isFileUploaderOpen} actions={actions} />
  ]
}

App.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}
