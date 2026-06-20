import { type DocumentationArticle } from '../../documentation.model';

export const StateManagementStandardArticle: DocumentationArticle = {
  id: 'state-management-standard',
  title: 'State Management Standard',
  summary: 'How TanStack Query, mutations, SignalStore, Zod, and OpenAPI divide ownership.',
  sections: [
    {
      heading: 'Core Philosophy',
      markdown: `
\`\`\`text
External async/server data -> TanStack Query + Mutations
UI/client state -> SignalStore
External data safety -> Zod
Browser transport/contracts -> OpenAPI-generated Node.js server clients
API routes and SQL-backed data access -> Node.js server
Optional domain services -> Java Spring Boot APIs
Rendering -> Angular components
\`\`\`
`
    },
    {
      heading: 'State Ownership',
      markdown: `
| State category | Owner | Description |
| --- | --- | --- |
| GET operations | TanStack Query | Queries are only for GET operations, read-only async data, and cached server state. |
| Read-only async data | TanStack Query | Server reads should flow through query keys, cache state, stale time, retries, and invalidation rules. |
| POST operations | TanStack Mutations | Mutations are only for operations that change data. |
| PUT operations | TanStack Mutations | Full updates use mutation flows and update cache through invalidation, refetch, optimistic updates, and mapper output. |
| PATCH operations | TanStack Mutations | Partial updates use mutation flows and do not live in SignalStore. |
| DELETE operations | TanStack Mutations | Deletes use mutation flows and invalidate affected query data. |
| Uploads | TanStack Mutations | Uploads change server state and use mutation handling. |
| Command actions | TanStack Mutations | Backend actions that change data use mutation handling. |
| Selected row | SignalStore | Screen state owned by the UI. |
| Search filters | SignalStore | UI filtering state that drives query keys and component display. |
| Pagination | SignalStore | UI pagination state that can become part of query keys. |
| Dialog state | SignalStore | Modal and panel state owned by the screen. |
| Wizard state | SignalStore | Multi-step UI workflow state owned by the screen. |
| Layout state | SignalStore | Expanded, compact, selected, pinned, and visible UI state. |
| UI selections | SignalStore | Client selections that do not belong in server cache. |
| Server cache | TanStack Query | SignalStore never owns server cache. |
| HTTP loading state | TanStack Query | SignalStore never owns API loading state. |
| Retry logic | TanStack Query | SignalStore never owns API retry logic. |
| API persistence | TanStack Query and Mutations | SignalStore never owns persistence behavior. |
`
    }
  ]
};
