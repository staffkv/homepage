export type Bookmark = {
  id: string
  title: string
  url: string
  savedAt: string // ISO date
}

export const bookmarks: Bookmark[] = [
  { id: '1', title: 'Unami', url: 'https://umami.is/docs', savedAt: '2025-12-15' },
  { id: '2', title: 'Oh my posh', url: 'https://ohmyposh.dev/docs/installation/linux', savedAt: '2025-12-02' },
  { id: '3', title: 'How Temporal Powers Reliable Cloud Operations at Netflix', url: 'https://netflixtechblog.com/how-temporal-powers-reliable-cloud-operations-at-netflix-73c69ccb5953', savedAt: '2025-12-24' },
  { id: '4', title: 'A Nova Era do Framework Mais Amado do Google', url: 'https://ghabryel.medium.com/angular-21-a-nova-era-do-framework-mais-amado-do-google-91034bf22fbb', savedAt: '2025-12-27' },
]
