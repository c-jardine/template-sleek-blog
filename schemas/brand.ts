import { defineType } from 'sanity';

import { MdBrandingWatermark } from '@react-icons/all-files/md/MdBrandingWatermark';

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: 'brand',
  title: 'Brand',
  icon: MdBrandingWatermark,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: "Your name or organization's name.",
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'theme',
      description:
        "Choose the color theme of your blog. This doesn't apply to the studio, which can be set in the studio settings in the top right corner.",
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'light',
      validation: (rule) => rule.required(),
    },
    {
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
});
