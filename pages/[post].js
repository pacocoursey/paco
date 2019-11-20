import { useRouter } from 'next/router'
import Post from '../components/post'
import Page from '../components/page'

const PostPage = () => {
  const { query } = useRouter()
  const { post } = query

  if (!query || post === undefined) {
    // Wait for dynamic routing to resolve
    return <Page footer={false} />
  }

  return <Post slug={post} />
}

export default PostPage
