import React from 'react';

import Page from './Page';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const A = styled.article`
  font-size: 1.25rem;
  letter-spacing: -0.022rem;
  line-height: 1.7;
  opacity: 0;
  animation: ${fadeIn} 500ms 0.6s ease-in-out forwards;

  max-width: 42rem;
  img {
    max-width: 42rem;
  }

  p {
    margin: 1.875rem 0;
  }

  header {
    opacity: 0;
    animation: ${fadeUp} 500ms 0.5s ease-in-out forwards;
    margin: 2rem 0;

    h1 {
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      color: var(--gray);
      font-size: 1rem;
    }
  }

  footer {
    opacity: 0;
    animation: ${fadeUp} 500ms 0.7s ease-in-out forwards;

    .footnotes {
      counter-reset: footnote;
      font-size: 1rem;

      p::before {
        margin-right: 10px;
        counter-increment: footnote;
        content: counters(footnote, ".") " ";
      }
    }
  }
`;

export default ({ children, title }) => (
  <Page title={title}>
    <A>
      {children}
    </A>
  </Page>
);
