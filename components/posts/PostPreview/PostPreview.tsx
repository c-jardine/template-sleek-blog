import Link from 'next/link'
import { PostProps } from '../../../types'
import { CoverImage, Date } from '../../core'

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostProps) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} image={coverImage} priority={false} />
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      {/* {author && <Avatar name={author.name} picture={author.picture} />} */}
    </div>
  )
}

export default PostPreview
