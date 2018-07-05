import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Preview from '../Preview'
import Editor from '../Editor'
import AppBar from '../AppBar'
import './App.css'

/**
 * The top-level presentational component.
 */
export default function App({ state, actions }) {
  const { activeView } = state
  return (
    <div className="App">
      <AppBar {...state} actions={actions} />
      <div className={classNames('App-layout', activeView)}>
        {activeView !== 'editor' && <Preview {...state} actions={actions} />}
        {activeView !== 'preview' && <Editor {...state} actions={actions} />}
      </div>
    </div>
  )
}

App.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}
