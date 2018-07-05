import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import marked from 'marked'
import * as prism from 'prismjs' // imports all prism language modules
import './Preview.css'

// Marked render instance
const renderer = new marked.Renderer()

// Test #7 -  Add a custom renderer for `<a>` tags that adds target="_blank"
renderer.link = function(href, title, text, style) {
  return `<a target="_blank" href="${href}" title="${title}" style=${style ||
    ''}>${text}</a>`
}

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
  breaks: true, //  Required for FCC test #8
  highlight,
  renderer
})

/**
 * The preview panel shows a live preview of the rendered markdown document
 */
export default function Preview({ editorContent, activeView, documentTitle }) {
  const content = marked(editorContent)
  return (
    <section className={classNames('Preview', activeView)}>
      <article className="Preview-document">
        <header className="Preview-heading">
          <img src="icons/book.svg" alt="book" className="icon" aria-hidden />
          <h3 className="Preview-title">{documentTitle}</h3>
        </header>
        <div
          id="preview"
          className="Preview-body markdown-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </section>
  )
}

Preview.propTypes = {
  /** The markdown content to render */
  editorContent: PropTypes.string.isRequired,
  /** The current view (app layout) */
  activeView: PropTypes.oneOf(['editor', 'preview', 'split']).isRequired
}
