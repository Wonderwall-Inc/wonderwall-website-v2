import type { CollectionConfig, PaginatedDocs, SingleRelationshipField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

interface NestedDocParent {
  id: number
  title: string
  slug: string
}

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { FormBlock } from '@/blocks/Form/config'
import { Page } from '@/payload-types'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: async ({ data, locale, ...rest }) => {
        let parentDoc: PaginatedDocs<Page> | undefined = undefined

        if (data.parent) {
          parentDoc = await rest.payload.find({
            collection: 'pages',
            where: {
              id: {
                equals: data.parent
              }
            }
          })
        }

        const path = generatePreviewPath({
          locale: locale.code === 'en' ? 'en-us' : 'ja',
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          parentSlug: parentDoc?.docs[0].slug ?? undefined
        })


        const url = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_SERVER_URL}${path}` : path
        console.log({ url })
        return url
      },
    },
    preview: (data, options) => {
      const path = generatePreviewPath({
        locale: options.locale === 'en' ? 'en-us' : 'ja',
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        parentSlug: (data.parent as NestedDocParent).slug ?? null
      })
      console.log(data.breadcrumbs)

      return process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_SERVER_URL}${path}` : path
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, FormBlock, MediaBlock],
              required: true,
              localized: true
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {},
    maxPerDoc: 50,
  },
}
