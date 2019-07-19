/* eslint-disable react/no-danger */

import React from 'react';
import refractor from 'refractor';
import rehype from 'rehype';

export default ({ children, className }) => (
  <pre className={className}>
    {className ? (
      <code
        className={className}
        dangerouslySetInnerHTML={{
          __html: rehype()
            .stringify({
              type: 'root',
              children: refractor.highlight(children, className.split('language-')[1]),
            })
            .toString(),
        }}
      />
    ) : (
      <code>{children}</code>
    )}

    <style jsx>
      {`
        pre {
          background-color: var(--lighter-gray);
          color: var(--fg);
          padding: 1rem;
          border-radius: 5px;
          font-size: 1rem;
        }

        pre code {
          font-family: var(--monospace);
          line-height: 1.3;
        }
      `}
    </style>

    <style jsx global>
      {`
        code[class*='language-'],
        pre[class*='language-'] {
          color: var(--fg);
          direction: ltr;
          text-align: left;
          white-space: pre-wrap;
          word-spacing: normal;
          word-break: normal;
          tab-size: 4;
          hyphens: none;
        }
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #999;
        }
        .token.namespace {
          opacity: 0.7;
        }
        .token.string {
          color: #028265;
        }
        .token.attr-value,
        .token.punctuation,
        .token.operator {
          color: var(--fg);
        }
        .token.url,
        .token.symbol,
        .token.boolean,
        .token.variable,
        .token.constant,
        .token.inserted {
          color: #36acaa;
        }
        .token.atrule,
        .language-autohotkey .token.selector,
        .language-json .token.boolean,
        code[class*='language-css'] {
          font-weight: 600;
        }
        .language-json .token.boolean {
          color: #0076ff;
        }
        .token.keyword {
          color: #ff0078;
          font-weight: bolder;
        }
        .token.function,
        .token.tag,
        .token.class-name,
        .token.number {
          color: #0076ff;
        }
        .token.deleted,
        .language-autohotkey .token.tag {
          color: #9a050f;
        }
        .token.selector,
        .language-autohotkey .token.keyword {
          color: #00009f;
        }
        .token.important,
        .token.bold {
          font-weight: bold;
        }
        .token.italic {
          font-style: italic;
        }
        .language-json .token.property,
        .language-markdown .token.title {
          color: var(--fg);
          font-weight: bolder;
        }
        .language-markdown .token.code {
          color: #0076ff;
          font-weight: normal;
        }
        .language-markdown .token.list,
        .language-markdown .token.hr {
          color: #999;
        }
        .language-markdown .token.url {
          color: #ff0078;
          font-weight: bolder;
        }
        .token.selector {
          color: #2b91af;
        }
        .token.property,
        .token.entity {
          color: #ff0000;
        }
        .token.attr-name,
        .token.regex {
          color: #d9931e;
        }
        .token.directive.tag .tag {
          background: #ffff00;
          color: #393a34;
        }
        /* dark */
        .language-json .dark .token.boolean {
          color: #0076ff;
        }
        .dark .token.string {
          color: #50e3c2;
        }
        .dark .token.function,
        .dark .token.tag,
        .dark .token.class-name,
        .dark .token.number {
          color: #2ba8ff;
        }
        .dark .token.attr-value,
        .dark .token.punctuation,
        .dark .token.operator {
          color: #efefef;
        }
        .dark .token.attr-name,
        .dark .token.regex {
          color: #fac863;
        }
        .language-json .dark .token.property,
        .language-markdown .dark .token.title {
          color: #fff;
        }
        .language-markdown .dark .token.code {
          color: #50e3c2;
        }
      `}
    </style>
  </pre>
);
