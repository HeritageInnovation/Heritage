import { defineType, defineField } from "sanity"

export const curationSubmission = defineType({
  name: "curationSubmission",
  title: "Curation Submission",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "estimatedValue",
      title: "Estimated Value (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "submitter",
      title: "Submitter",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Under Review", value: "under_review" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
          { title: "Live", value: "live" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "upvotes",
      title: "Upvotes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "totalStaked",
      title: "Total USDT Staked",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "stakers",
      title: "Stakers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "user",
              title: "User",
              type: "reference",
              to: [{ type: "user" }],
            }),
            defineField({
              name: "amount",
              title: "USDT Amount",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "timestamp",
              title: "Timestamp",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "technicalProvenance",
      title: "Technical Provenance",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "expert",
              title: "Expert",
              type: "reference",
              to: [{ type: "user" }],
            }),
            defineField({
              name: "verification",
              title: "Verification Status",
              type: "string",
              options: {
                list: [
                  { title: "Verified", value: "verified" },
                  { title: "Pending", value: "pending" },
                  { title: "Rejected", value: "rejected" },
                ],
              },
            }),
            defineField({
              name: "notes",
              title: "Expert Notes",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "timestamp",
              title: "Timestamp",
              type: "datetime",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
})
