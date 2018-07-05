import React from 'react'
import FileSaver from 'file-saver'
import exampleDoc from './example.md'
/** Initial state for the app */
const initialState = {
  /**
   * The current input value of the editor.
   * @type {string}
   */
  editorContent: '',

  /**
   * The title of the markdown document.
   * @type {string}
   */
  documentTitle: 'My Document',

  /**
   * Controls if title input is visible
   * @type {boolean}
   */
  isEditingTitle: false,

  /**
   * The layout of the app
   * @type {'editor' | 'preview' | 'split'}
   */
  activeView: 'split',

  /**
   * Controls if the fiile uploader modal is visible
   * @type {boolean}
   */
  isFileUploaderOpen: false
}

export default class AppStore extends React.Component {
  /** App State */
  state = { ...initialState }

  /** Functions to update state or perform side effect  */
  actions = {
    /** Updates the input value (content of the editor) */
    setEditorContent: (newValue) => {
      this.setState((prevState) => ({ editorContent: String(newValue) }))
    },

    /** Sets the title of the document */
    setDocumentTitle: (value) => {
      // Remove file extension and ensure title does not exceed max length
      const documentTitle = value.replace(/\.\w+$/, '').slice(0, 30)
      this.setState({ documentTitle })
    },

    /** Starts a new document */
    startNewDocument: (title = '', content = '') => {
      this.actions.setDocumentTitle(title)
      this.actions.setEditorContent(content)
    },

    /** Sets the active view setting ('editor' | 'preview' | 'split') */
    setActiveView: (view) => () => {
      if (/(preview|editor|split)/.test(view)) {
        this.setState({ activeView: view })
      }
    },

    /** Saves the content of the editor as a markdown file to local disk  */
    saveAsFile: () => {
      const { editorContent, documentTitle } = this.state
      const fileOptions = { type: 'text/plain;charset=utf-8' }
      const file = new File([editorContent], `${documentTitle}.md`, fileOptions)
      FileSaver.saveAs(file)
    },

    /** Toggle the file uploader modal  */
    toggleFileUploader: (open = true) => () => {
      this.setState({ isFileUploaderOpen: Boolean(open) })
    }
  }

  async componentDidMount() {
    const response = await fetch(exampleDoc)
    if (this.state.editorContent === '') {
      this.setState({ editorContent: await response.text() })
    }
  }

  render() {
    const { state, actions } = this
    return this.props.children({ state, actions })
  }
}
