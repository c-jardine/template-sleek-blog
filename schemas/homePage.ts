import { FaHome } from '@react-icons/all-files/fa/FaHome';
import { defineType } from 'sanity';
import postType from './post';

export default defineType({
  name: 'homePageSettings',
  title: 'Home Page Settings',
  type: 'document',
  icon: FaHome,
  fields: [
    {
      name: 'featuredPosts',
      description:
        'The posts featured in the carousel. Choose between one and four.',
      title: 'Featured Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Posts',
          description: 'Add a post to the carousel.',
          to: { type: postType.name },
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (rule) => [
        rule.required().min(1).error('At least 1 post is required.'),
        rule.max(4).error('Only up to 4 posts can be featured.'),
      ],
    },
  ],
});
