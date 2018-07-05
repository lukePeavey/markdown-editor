import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MonacoEditor from 'react-monaco-editor'
import './Editor.css'

/** Configuration options for monaco editor */
export const editorOptions = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  wordWrap: 'bounded',
  wordWrapColumn: 120,
  fontFamily: 'Fira Code',
  fontLigatures: true,
  fontSize: 13,
  lineHeight: 20,
  tabWidth: 2,
  formatOnPaste: true,
  autoFocus: true,
  scrollbar: {
    verticalScrollbarSize: 12,
    horizontalScrollbarSize: 12
  }
}

/**
 * Editor component
 */
export default class Editor extends React.Component {
  editorDidMount = (editor) => {
    this.editor = editor
    editor.getModel().updateOptions({ tabSize: 2 })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.activeView !== this.props.activeView) {
      if (this.editor) {
        this.editor.layout()
      }
    }
  }

  render() {
    const { actions, activeView, editorContent } = this.props
    const splitView = activeView === 'split'
    return (
      <div className={classNames('Editor', splitView && 'split')} key="editor">
        <MonacoEditor
          language="markdown"
          theme="vs-dark"
          value={editorContent}
          options={editorOptions}
          onChange={actions.setEditorContent}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
}

Editor.propTypes = {
  /** The current input of the editor */
  editorContent: PropTypes.string.isRequired,
  /** The current view setting (layout mode) */
  activeView: PropTypes.oneOf(['editor', 'preview', 'split']).isRequired,
  actions: PropTypes.shape({
    /** Updates editor value in state  */
    setEditorContent: PropTypes.func.isRequired
  })
}
