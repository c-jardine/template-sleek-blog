/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { FaSlidersH } from '@react-icons/all-files/fa/FaSlidersH';
import { colorInput } from '@sanity/color-input';
import { visionTool } from '@sanity/vision';
import { defineConfig, Slug } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { deskTool } from 'sanity/desk';
import { PostsPreview } from './components/posts/PostsPreview';
import authorType from './schemas/author';
import brandType from './schemas/brand';
import categoryType from './schemas/category';
import homePageType from './schemas/homePage';
import postType from './schemas/post';
import settingsType from './schemas/settings';
import socialsType from './schemas/socials';

// @TODO: update next-sanity/studio to automatically set this when needed
const basePath = '/studio';

const config = defineConfig({
  basePath,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Blog Admin',
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      settingsType,
      postType,
      authorType,
      socialsType,
      categoryType,
      homePageType,
      brandType,
    ],
  },
  plugins: [
    colorInput(),
    deskTool({
      structure: (S) => {
        // The `Settings` root list item
        const settings = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title('Settings')
            .icon(settingsType.icon)
            .child(
              S.list()
                .title('Settings')
                .items([
                  S.listItem()
                    .title('General')
                    .icon(FaSlidersH)
                    .child(
                      S.editor()
                        .id(settingsType.name)
                        .schemaType(settingsType.name)
                        .documentId(settingsType.name)
                    ),
                  S.listItem()
                    .title('Brand')
                    .icon(brandType.icon)
                    .child(
                      S.document()
                        .id(brandType.name)
                        .schemaType(brandType.name)
                        .documentId(brandType.name)
                    ),
                  S.divider(),
                  S.listItem()
                    .title('Home Page')
                    .icon(homePageType.icon)
                    .child(
                      S.document()
                        .id(homePageType.name)
                        .schemaType(homePageType.name)
                        .documentId(homePageType.name)
                    ),
                ])
            );

        // The default root list items (except custom ones)
        const defaultListItems = S.documentTypeListItems().filter(
          (listItem) =>
            listItem.getId() !== settingsType.name &&
            listItem.getId() !== homePageType.name &&
            listItem.getId() !== brandType.name &&
            listItem.getId() !== socialsType.name
        );

        return S.list()
          .title('Content')
          .items([settings, S.divider(), ...defaultListItems]);
      },

      // `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === 'post') {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
          ]);
        }

        return null;
      },
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: '2022-08-08',
    }),
  ],
  document: {
    productionUrl: async (prev, { document }) => {
      const url = new URL('/api/preview', location.origin);
      const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET;
      if (secret) {
        url.searchParams.set('secret', secret);
      }

      try {
        switch (document._type) {
          case settingsType.name:
            break;
          case postType.name:
            url.searchParams.set('slug', (document.slug as Slug).current!);
            break;
          default:
            return prev;
        }
        return url.toString();
      } catch {
        return prev;
      }
    },
    // Hide 'Settings' from new document options
    // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) =>
            templateItem.templateId !== settingsType.name &&
            templateItem.templateId !== homePageType.name &&
            templateItem.templateId !== brandType.name&&
            templateItem.templateId !== socialsType.name
        );
      }

      return prev;
    },
    // Removes the "duplicate" action on the "settings" singleton
    actions: (prev, { schemaType }) => {
      if (schemaType === settingsType.name) {
        return prev.filter(({ action }) => action !== 'duplicate');
      }

      return prev;
    },
  },
});

export default config;
