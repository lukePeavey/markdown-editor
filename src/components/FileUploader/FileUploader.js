import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Message, Modal, Icon } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { CSSTransition } from 'react-transition-group'
import './FileUploader.css'

/**
 * A modal for selecting files to open in the editor
 */
export default class FileUploader extends React.Component {
  /** Local component state (only used within this component) */
  state = {
    /**
     * @type {File | null}
     */
    file: null,
    /**
     * @type {string | null}
     */
    fileContent: null
  }

  handleClose = () => {
    this.props.actions.toggleFileUploader(false)()
    this.setState({ file: null, fileContent: null, error: null })
  }
  /**
   * Callback executed when file is dropped/selected in the dropzone
   */
  handleFileDrop = (accepted, rejected) => {
    const file = accepted[0]
    const reader = new FileReader()
    const onLoad = (e) => this.setState({ file, fileContent: e.target.result })
    const onError = (e) => {} // @todo add error handler
    if (file) {
      reader.onload = onLoad
      reader.onerror = onError
      reader.readAsText(accepted[0])
    } else {
      // @todo Add some ui feedback for this scenario
      console.log('This type of file is not allowed')
    }
  }

  /**
   * Callback executed when the user confirms they want to open the
   * selected file. This will update the content of the editor to
   * the selected file.
   */
  handleConfirm = (event) => {
    const { file, fileContent } = this.state
    this.props.actions.startNewDocument(file.name, fileContent)
    this.handleClose()
    event.preventDefault()
  }

  /**
   * Renders a message with confirmation button.
   * This is displayed after the user has selected a file.
   */
  renderMessage() {
    return (
      <div className="FileUploader-message">
        <Message attached="bottom">
          <Icon name="check" style={{ color: 'green', fontSize: ' 1.2em' }} />
          {this.state.file ? this.state.file.name : ''}
          <Button onClick={this.handleConfirm}>Open File</Button>
        </Message>
      </div>
    )
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.handleClose}
        className="FileUploader"
        size="tiny"
      >
        <div className="FileUploader-content">
          <Dropzone
            multiple={false}
            className="FileUploader-dropzone"
            accept=".md"
            onDrop={this.handleFileDrop}
          >
            <Header>Drag markdown file here or click to open</Header>
            <div className="FileUploader-circle">
              <Icon name="file" size="big" style={{ marginRight: 0 }} />
            </div>
          </Dropzone>
          <CSSTransition
            in={this.state.file !== null}
            unmountOnExit={true}
            classNames="FileUploader-message"
            timeout={300}
          >
            {this.renderMessage()}
          </CSSTransition>
        </div>
      </Modal>
    )
  }
}

FileUploader.propTypes = {
  /** Controls if the modal will be displayed */
  open: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    /** Set the content of the editor */
    startNewDocument: PropTypes.func.isRequired,
    /** Closed the file uploader modal */
    toggleFileUploader: PropTypes.func.isRequired
  }).isRequired
}
