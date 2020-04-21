import Page from '@components/page'
import Entry from '@components/entry'

const Projects = () => {
  return (
    <Page title="Projects" description="Collection of past and present work.">
      <article>
        <Entry
          title="Vercel Design"
          description="The Vercel Design System"
          image="https://assets.zeit.co/image/upload/q_auto/front/assets/design/geist-card.png"
          href="https://zeit.co/design"
        />

        <Entry
          title="Opus"
          description="Minimal note-taking application"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672667/opus_ts9o1o.png"
          href="https://github.com/pacocoursey/opus"
          position="top"
        />

        <Entry
          title="Dusk"
          description="Simple application icons"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672667/dusk_o7qcsa.png"
          href="https://github.com/pacocoursey/dusk"
          position="top"
        />

        <Entry
          title="F2PRS"
          description="Accurate hiscores for RuneScape"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672667/f2prs_se1f4c.png"
          href="https://github.com/pacocoursey/f2prs"
          position="top"
        />

        <Entry
          title="Xi"
          description="Monochrome Atom UI theme"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672666/xi_xti7x0.png"
          href="https://github.com/pacocoursey/xi-ui"
          position="top"
        />

        <Entry
          title="EHP"
          description="Design and Website for EHP"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672667/ehp_ibfrlz.png"
          href="https://github.com/pacocoursey/ehp-rs"
          position="top"
        />

        <Entry
          title="Songbird"
          description="Website for Songbird Healing Studio"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672667/songbird_sb0kon.png"
          href="http://songbirdhealingstudio.com/"
          position="top"
        />
      </article>
    </Page>
  )
}

export default Projects
