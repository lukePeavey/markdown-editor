import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu } from 'semantic-ui-react'
import './AppBar.css'

export default class AppBar extends React.Component {
  /** Local component state */
  state = {
    /** Controls the value title input (the actual title is stored in global state */
    titleInputValue: this.props.documentTitle,
    /** Controls if the title input is visible or hidden */
    isEditingTitle: false
  }

  /**
   * Clicking on the title in the AppBar (or selecting "rename" in the
   * file menu toggles the input to edit document title.
   */
  handleTitleClick = () => {
    if (!this.state.isEditingTitle) {
      this.setState({
        isEditingTitle: true,
        titleInputValue: this.props.documentTitle
      })
    }
  }

  /**
   * When the title input opens the current text should be selected
   */
  handleTitleInputFocus = (event) => {
    event.currentTarget.select()
  }

  /**
   * Updates the input value as user types
   */
  handleTitleInputChange = (event) => {
    this.setState({ titleInputValue: event.currentTarget.value })
  }

  /**
   * Submits the changes when user is done editing title. If the input
   * value is empty, set title to 'Untitled Document'
   */
  handleTitleInputSubmit = (event) => {
    const newTitle = this.state.titleInputValue || 'Untitled Document'
    this.props.actions.setDocumentTitle(newTitle)
    this.setState({ isEditingTitle: false, titleInputValue: newTitle })
    event.preventDefault()
  }

  /**
   * Handles click event outside the title input.
   * Clicking anywhere outside the input while editing the title
   * has the same effect as pressing enter
   */
  handleTitleOutsideClick = (event) => {
    if (this.state.isEditingTitle) {
      if (this.input && this.input !== event.target) {
        this.handleTitleInputSubmit(event)
      }
    }
  }

  /**
   * When the user starts a new document
   */
  handleNewDocument = () => {
    // Reset editor content and title
    this.props.actions.startNewDocument()
    // Toggle the title input and prompt the user to enter a title
    this.setState({ isEditingTitle: true, titleInputValue: '' })
  }

  componentDidUpdate = (_, prevState) => {
    // Add the outside click handler while the user is editing title
    if (prevState.isEditingTitle !== this.state.isEditingTitle) {
      const toggle = this.state.isEditingTitle ? 'add' : 'remove'
      document[`${toggle}EventListener`]('click', this.handleTitleOutsideClick)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleTitleOutsideClick)
  }

  render() {
    const { activeView, documentTitle, actions } = this.props
    // View navigation buttons
    const viewOptions = [
      { name: 'editor', text: 'Editor', icon: 'code' },
      { name: 'split', text: 'Preview', icon: 'columns' },
      { name: 'preview', text: 'Split', icon: 'window maximize outline' }
    ]
    // File dropdown menu items
    const fileMenuButtons = [
      { text: 'New Document', onClick: this.handleNewDocument },
      { text: 'Save File', onClick: actions.saveAsFile },
      { text: 'Open File', onClick: actions.toggleFileUploader() },
      { text: 'Rename', onClick: this.handleTitleClick }
    ]

    return (
      <Menu className="AppBar" size="large">
        <Menu.Menu>
          <Dropdown item text="File Menu">
            <Dropdown.Menu>
              {fileMenuButtons.map((itemProps) => (
                <Dropdown.Item {...itemProps} key={itemProps.text} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            className="AppBar-titleInput"
            onClick={this.handleTitleClick}
          >
            {this.state.isEditingTitle ? (
              <form className="ui input" onSubmit={this.handleTitleInputSubmit}>
                <input
                  aria-label="Rename"
                  autoFocus={true}
                  maxLength={25}
                  onChange={this.handleTitleInputChange}
                  onFocus={this.handleTitleInputFocus}
                  placeholder="Enter Title"
                  ref={(input) => (this.input = input)}
                  type="text"
                  value={this.state.titleInputValue}
                />
              </form>
            ) : (
              <span className="AppBar-title">{documentTitle}</span>
            )}
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right" options={viewOptions}>
          {viewOptions.map((itemProps) => (
            <Menu.Item
              {...itemProps}
              active={activeView === itemProps.name}
              key={itemProps.name}
              onClick={actions.setActiveView(itemProps.name)}
            />
          ))}
        </Menu.Menu>
      </Menu>
    )
  }
}

AppBar.propTypes = {
  /** The title to display in the AppBar */
  documentTitle: PropTypes.string.isRequired,
  /** The current view (app layout) */
  activeView: PropTypes.oneOf(['editor', 'preview', 'split']).isRequired,
  actions: PropTypes.shape({
    setActiveView: PropTypes.func.isRequired,
    /** The title of the document */
    startNewDocument: PropTypes.func.isRequired,
    /** Function to update the document title stored in state */
    setDocumentTitle: PropTypes.func.isRequired,
    /** Function to save the current input as a markdown file */
    saveAsFile: PropTypes.func.isRequired,
    /** Opens the select file dialog  */
    toggleFileUploader: PropTypes.func.isRequired
  }).isRequired
}
