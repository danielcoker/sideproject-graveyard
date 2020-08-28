import marked from 'marked';
import Turndown from 'turndown';

const TurndownService = new Turndown();

const mdOptions = {
  // whether to conform to original MD implementation
  pedantic: false,
  // Github Flavoured Markdown
  gfm: true,
  // tables extension
  tables: true,
  // smarter list behavior
  smartLists: true,
  // "smart" typographic punctuation for things like quotes and dashes
  smartypants: true,
  // sanitize HTML tags
  sanitize: true,
  // ... other options
};

const todoListItemRenderer = (text) => {
  if (text.includes('type="checkbox"')) {
    return `<li style="list-style: none">${text}</li>`;
  }
  return `<li>${text}</li>`;
};

const externalLinkRenderer = (href, title, text) => {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    if (!text) {
      // eslint-disable-next-line no-param-reassign
      text = href;
    }
    return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
  }
  return `[${text}](${href})`;
};

export function convertToHTML(markdownText) {
  const renderer = new marked.Renderer();
  renderer.listitem = todoListItemRenderer;
  renderer.link = externalLinkRenderer;
  marked.setOptions(mdOptions);
  return marked(markdownText, { renderer });
}

export function convertToMarkdown(htmlText) {
  return TurndownService.turndown(htmlText);
}
