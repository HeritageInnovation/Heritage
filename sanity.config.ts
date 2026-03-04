import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { luxuryItem } from "./sanity/schemas/luxuryItem"
import { protocolStep, vaultLocation, insurancePartner, provenanceEntry } from "./sanity/schemas/content"
import { user } from "./sanity/schemas/user"
import { curationSubmission } from "./sanity/schemas/curation"

export default defineConfig({
  name: "heritage-cms",
  title: "Heritage RWA CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [luxuryItem, protocolStep, vaultLocation, insurancePartner, provenanceEntry, user, curationSubmission],
  },
})
