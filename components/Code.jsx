import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { registerLanguage } from 'react-syntax-highlighter/dist/light';
import style from 'react-syntax-highlighter/dist/styles/hljs/atom-one-dark';

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
    'Menlo, Monaco, Lucida Console, Liberation Mono, Courier New, monospace, serif'
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
      <SyntaxHighlighter
        language={language}
        style={style}
        customStyle={styles}
      >
        {children}
      </SyntaxHighlighter>
    );
  }
}

export default Code;
