import Post from '../../components/post'
import getPosts from '../../lib/get-posts'
import renderMarkup from '../../lib/render-markup'

const PostPage = (props) => {
  return <Post {...props} />
}

export const getStaticProps = ({ params }) => {
  const { slug } = params

  const post = getPosts().find(p => p.slug === slug)
  const { body, ...rest } = post

  return {
    props: {
      ...rest,
      html: renderMarkup(body)
    }
  }
}

export const getStaticPaths = () => {
  return {
    paths: getPosts().map(p => `/blog/${p.slug}`),
    fallback: false
  }
}

export default PostPage
