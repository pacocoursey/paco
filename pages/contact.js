import Page from '../components/page'

const Contact = () => {
  return (
    <Page title="Contact">
      <article>
        <p>Get in touch.</p>

        <blockquote>
          <a href="mailto:p@paco.im?subject=Hello" className="reset">
            p@paco.im
          </a>
        </blockquote>
      </article>
    </Page>
  )
}

export default Contact
