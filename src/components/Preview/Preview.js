import React from 'react'
import PropTypes from 'prop-types'

/**
 * The preview panel shows a live preview of the rendered markdown document
 */
export default function Preview(props) {
  return <section id="preview">{props.markdown}</section>
}

Preview.propTypes = {
  /** The markdown content to render */
  markdown: PropTypes.string.isRequired,
}
