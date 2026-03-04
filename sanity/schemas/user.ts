import { defineType, defineField } from "sanity"

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "walletAddress",
      title: "Wallet Address",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^0x[a-fA-F0-9]{40}$/, { name: 'Ethereum Address', invert: false }),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Participant", value: "participant" },
          { title: "Professional", value: "professional" },
          { title: "Investor", value: "investor" },
        ],
      },
      initialValue: "participant",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reputationScore",
      title: "Reputation Score",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "successfulCurations",
      title: "Successful Curations",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "totalStaked",
      title: "Total USDT Staked",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "isVerifiedProfessional",
      title: "Verified Professional",
      type: "boolean",
      initialValue: false,
      description: "Whether this user has been verified as a professional expert",
    }),
  ],
  preview: {
    select: {
      title: "username",
      subtitle: "walletAddress",
    },
  },
})
