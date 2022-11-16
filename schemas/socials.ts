import { LinkIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export default defineType({
  name: 'socials',
  title: 'Social Media',
  icon: LinkIcon,
  type: 'document',
  fields: [
    {
      name: 'facebook',
      title: 'Facebook URL',
      type: 'string',
    },
    {
      name: 'twitter',
      title: 'Twitter URL',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'string',
    },
    {
      name: 'youtube',
      title: 'YouTube URL',
      type: 'string',
    },
  ],
});
