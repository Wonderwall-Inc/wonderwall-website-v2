import { type CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { FeatureProviderServer, lexicalEditor, UnorderedListFeature } from '@payloadcms/richtext-lexical'

const createLexicalEditor = (customFeatures?: FeatureProviderServer[]) =>
  lexicalEditor({
    features: ({ rootFeatures }) => customFeatures ? [...rootFeatures, ...customFeatures] : [...rootFeatures]
  })

export const JobListings: CollectionConfig = {
  slug: 'jobListings',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          locale: locale.code === 'en' ? 'en-us' : 'ja',
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'jobListings',
        })

        return process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_SERVER_URL}${path}` : path
      },
    },
    preview: (data, options) => {
      const path = generatePreviewPath({
        locale: options.locale === 'en' ? 'en-us' : 'ja',
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'jobListings',
      })

      return process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_SERVER_URL}${path}` : path
    },
    useAsTitle: 'jobTitle'
  },
  fields: [
    {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'jobSummary',
      label: 'Job Summary',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'jobDescription',
      label: 'Job Description',
      type: 'richText',
      editor: createLexicalEditor(),
      required: true,
      localized: true,
    },
    {
      name: 'responsibilities',
      label: 'Responsibilities',
      type: 'richText',
      localized: true,
      editor: createLexicalEditor([UnorderedListFeature()]),
      required: true,
    },
    {
      name: 'requiredSkills',
      label: 'Required Skills/Experience',
      type: 'richText',
      localized: true,
      editor: createLexicalEditor([UnorderedListFeature()]),
      required: true,
    },
    {
      name: "niceToHaveSkills",
      label: 'Nice To Have Skills',
      type: 'richText',
      localized: true,
      editor: createLexicalEditor([UnorderedListFeature()]),
      required: true,
    },
    {
      name: "workLocation",
      label: 'Work Location',
      type: 'richText',
      localized: true,
      editor: createLexicalEditor([UnorderedListFeature()]),
      required: true,
    },
    {
      name: "workHours",
      label: 'Work Hours',
      type: 'richText',
      editor: createLexicalEditor([UnorderedListFeature()]),
      required: true,
      localized: true,
    },
    {
      name: "salary",
      label: 'Salary/Compensation',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: "insurance",
      label: 'Insurance',
      type: 'richText',
      editor: createLexicalEditor(),
      required: true,
      localized: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image'
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost]
  },
  versions: {
    drafts: {},
    maxPerDoc: 50,
  },
}
