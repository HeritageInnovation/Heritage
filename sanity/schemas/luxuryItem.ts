import { defineType, defineField } from "sanity"

export const luxuryItem = defineType({
  name: "luxuryItem",
  title: "Luxury Item",
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
      name: "reserve",
      title: "Reserve Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "lotNumber",
      title: "Lot Number",
      type: "string",
      description: "Unique lot identifier (e.g., 001)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timeLeft",
      title: "Time Left",
      type: "string",
      description: "Auction time remaining (e.g., 2d 14h)",
    }),
    defineField({
      name: "tokenAddress",
      title: "Token Address",
      type: "string",
      description: "Ethereum contract address for this fractional asset token",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "currentBid",
      title: "Current Bid Display",
      type: "string",
      description: "Formatted bid amount (e.g., $1,240,000)",
    }),
    defineField({
      name: "image",
      title: "Item Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Item",
      type: "boolean",
      initialValue: false,
      description: "Display this item prominently on the home page",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
})
