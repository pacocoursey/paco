import marked from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

const renderer = new marked.Renderer()

renderer.link = (href, _, text) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  renderer,
  highlight: (code, language) => {
    return Prism.highlight(code, Prism.languages[language])
  }
})

export default markdown => marked(markdown)
