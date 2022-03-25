export interface IResource {
  id: number
  title: string
  description: string
  format: string
  content: string
  duration: number
  keywords: string[]
  starred: boolean
  easy_read: boolean
  lived_experience: boolean
  certifiable: boolean
  attribution: string
  folder: string
  url: string
  upload_date: Date
  slug: string
  search: string
  selected: boolean
}