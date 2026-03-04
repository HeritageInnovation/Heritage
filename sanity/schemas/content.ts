import { defineType, defineField } from "sanity"

export const protocolStep = defineType({
  name: "protocolStep",
  title: "Protocol Step",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Step Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
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
      name: "icon",
      title: "Icon Name",
      type: "string",
      options: {
        list: [
          { title: "Scan", value: "Scan" },
          { title: "Lock", value: "Lock" },
          { title: "Fingerprint", value: "Fingerprint" },
          { title: "FileCheck", value: "FileCheck" },
          { title: "Shield", value: "Shield" },
          { title: "BadgeCheck", value: "BadgeCheck" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
})

export const vaultLocation = defineType({
  name: "vaultLocation",
  title: "Vault Location",
  type: "document",
  fields: [
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Vault Type",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "capacity",
      title: "Capacity Display",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "Active",
    }),
  ],
})

export const insurancePartner = defineType({
  name: "insurancePartner",
  title: "Insurance Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Partner Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverage",
      title: "Coverage Type",
      type: "string",
    }),
    defineField({
      name: "syndicate",
      title: "Syndicate/Program Reference",
      type: "string",
    }),
  ],
})

export const provenanceEntry = defineType({
  name: "provenanceEntry",
  title: "Provenance Entry",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "Format: YYYY.MM.DD",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "event",
      title: "Event Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hash",
      title: "Transaction Hash",
      type: "string",
    }),
    defineField({
      name: "block",
      title: "Block Number",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
})
