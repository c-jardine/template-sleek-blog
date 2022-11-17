import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { defineType } from 'sanity';
import socialsType from './socials';

export default defineType({
  name: 'author',
  title: 'Author',
  icon: FaUser,
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'string',
    },
    {
      name: 'socials',
      title: 'Social Media',
      type: 'reference',
      to: [{ type: socialsType.name }],
    },
  ],
});
