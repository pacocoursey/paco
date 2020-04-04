import Head from '@components/head'
import Header from '@components/header'
import styles from './page.module.css'

const Page = ({
  header = true,
  footer = true,
  postFooter = false,
  content,
  title,
  description,
  image,
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <Head
        title={`${title ? `${title} - ` : ''}Paco Coursey`}
        description={description}
        image={image}
      />

      {header && <Header content={content} title={title} />}
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Page
