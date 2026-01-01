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
  { id: '5', title: 'Canary Deploy no Kubernetes com Argo Rollouts', url: 'https://www.mateops.me/posts/canary-deploy/', savedAt: '2025-12-28'},
  { id: '6', title: 'How Traffic Reaches NGINX - and Where It Quietly Dies', url: 'https://www.mateusprado.com/jotting/how-traffic-reaches-nginx', savedAt: '2026-01-01' },
  { id: '7', title: 'System Design Interview: Design WhatsApp', url: 'https://newsletter.systemdesign.one/p/whatsapp-system-design', savedAt: '2026-01-01' }
]
