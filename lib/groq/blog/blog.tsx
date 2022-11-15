import { groq } from 'next-sanity'

/**
 * Get blog settings.
 */
export const blogSettingsQuery = groq`*[_type == "settings"][0]{title}`
