import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { registerLanguage } from 'react-syntax-highlighter/dist/light';
import light from 'react-syntax-highlighter/dist/styles/hljs/github-gist';
import dark from 'react-syntax-highlighter/dist/styles/hljs/dark';

import ThemeContext from './ThemeContext';

const styles = {
  margin: '30px 0',
  padding: '14px',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box',
  wordWrap: 'normal',
  fontSize: '14.4px',
  lineHeight: '1.5em',
  WebkitOverflowScrolling: 'touch',
  fontFamily:
    'Menlo, Monaco, Lucida Console, Liberation Mono, Courier New, monospace, serif',
  transition: 'background 300ms ease-in-out, color 300ms ease-in-out',
};

class Code extends React.Component {
  constructor(props) {
    super(props);

    if (!props.language || !props.syntax) {
      throw new Error('Please define the `language` and `syntax`');
    }

    registerLanguage(props.language, props.syntax);
  }

  render() {
    const { language, children } = this.props;

    return (
      <ThemeContext.Consumer>
        {value => (
          <SyntaxHighlighter
            language={language}
            style={value === 'light' ? light : dark}
            customStyle={styles}
          >
            {children}
          </SyntaxHighlighter>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Code;
