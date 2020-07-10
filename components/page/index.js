import SEO from '@components/seo'
import Header from '@components/header'
import styles from './page.module.css'

const Page = ({
  header = true,
  footer = true,
  title,
  description,
  image,
  showHeaderTitle = true,
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <SEO
        // TODO: update me
        title={`${title ? `${title} - ` : ''}Paco Coursey`}
        description={description}
        image={image}
      />

      {header && <Header title={showHeaderTitle && title} />}
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Page
