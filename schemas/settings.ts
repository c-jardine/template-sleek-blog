import { FaCog } from '@react-icons/all-files/fa/FaCog';
import { defineType } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: FaCog,
  fields: [
    {
      name: 'title',
      description: 'The name of your blog',
      title: 'Title',
      type: 'string',
      initialValue: 'Blog.',
      validation: (rule) => rule.required(),
    },
    {
      name: 'url',
      description: 'The URL to your blog. This is needed for SEO purposes.',
      title: 'URL',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'type',
      description: 'Choose who this blog belongs to.',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Person', value: 'person' },
          { title: 'Organization', value: 'organization' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'person',
      validation: (rule) => rule.required(),
    },
  ],
});
