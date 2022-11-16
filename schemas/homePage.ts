import { HomeIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import postType from './post';

export default defineType({
  name: 'homePageSettings',
  title: 'Home Page Settings',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      name: 'featuredPosts',
      description: 'The posts featured in the carousel',
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
      validation: (rule) => rule.required(),
    },
  ],
});
