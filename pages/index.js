import Page from '@components/page'
import Link from '@components/link'
import Notification from '@components/notification'

const About = () => {
  return (
    <Page description="Hi, I'm Paco. Frontend developer and designer, mechanical keyboard enthusiast, practicing minimalist, and trance lover in search of flow.">
      <article>
        <h1>Paco Coursey</h1>

        <p>
          Frontend developer and designer,{' '}
          <Link underline href="/keyboards">
            mechanical keyboard
          </Link>{' '}
          enthusiast, practicing minimalist, and{' '}
          <Link underline href="/music">
            trance lover
          </Link>{' '}
          in search of flow.{' '}
          <Link underline href="/blog">
            Writing
          </Link>{' '}
          about design and code.
        </p>

        <p>
          Working with{' '}
          <Link underline href="https://vercel.com" external>
            ▲ Vercel
          </Link>{' '}
          to build better ways to deploy websites.
        </p>
      </article>

      <br />
      <br />

      <Notification
        title="Blog"
        text="Perfect Next.js Dark Mode"
        index={0}
        date="Today"
      />
      <Notification
        title="Music"
        text="Group Therapy 400, Helly Larsen, Falling"
        index={1}
        date="Yesterday"
      />
      <Notification
        title="Blog"
        text="macOS Color Picker"
        index={2}
        date="10/2"
      />
      <Notification
        title="Reading"
        text="Anxiety, Going Native, Accessible Dialog"
        index={3}
        date="9/27"
      />
    </Page>
  )
}

export default About
