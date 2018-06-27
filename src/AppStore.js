import React from 'react'
import PropTypes from 'prop-types'

/**
 * A root component that serves as the store for the app.
 * The state and actions are passed to the child component
 * as props.
 */
export default class AppStore extends React.Component {
  // App state
  state = {
    /** The value of the textarea (aka markdown editor) */
    editorContent: '',
  }

  // functions to update the state.
  actions = {
    /** Changes the value of the text area (editorContent) stored in state */
    changeEditorContent: (newValue) => {
      this.setState({ editorContent: newValue })
    },
  }

  render() {
    const { state, actions } = this
    return this.props.children({ state, actions })
  }
}

AppStore.propsTypes = {
  children: PropTypes.element.isRequired,
}
