import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu } from 'semantic-ui-react'
import './AppBar.css'

export default class AppBar extends React.Component {
  /** When the user starts a new doc, the editor and preview or reset */
  handleNewDocument = () => {
    // Reset editor content and title
    this.props.actions.startNewDocument()
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
      { text: 'Rename', onClick: () => {} }
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
          <Menu.Item>{documentTitle}</Menu.Item>
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
