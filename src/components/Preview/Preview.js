import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import * as prism from 'prismjs' // imports all prism language modules
import './Preview.css'

// Use Prism for syntax highlighting of code blocks in rendered markdown.
const highlight = (code, lang) => {
  const language = prism.languages[lang] || prism.languages['js']
  return prism.highlight(code, language)
}

marked.setOptions({
  gfm: true,
  tables: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight,
})

/**
 * The preview panel shows a live preview of the rendered markdown document
 */
export default function Preview({ markdown }) {
  const content = marked(markdown)
  return (
    <section className="Preview split">
      <header className="Preview-heading">
        <img src="icons/book.svg" className="icon" />
        <h3 className="Preview-title">Document Preview</h3>
      </header>
      <article className="Preview-document">
        <div
          id="preview"
          className="Preview-body markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </section>
  )
}

Preview.propTypes = {
  /** The markdown content to render */
  markdown: PropTypes.string.isRequired,
}
