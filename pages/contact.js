import Page from '@components/page'

const Contact = () => {
  return (
    <Page title="Contact" footer={false} description="Get in touch.">
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
