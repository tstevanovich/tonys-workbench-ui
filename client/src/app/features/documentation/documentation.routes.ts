import { type Routes } from '@angular/router';

import {
  defaultDocumentationArticleId,
  documentationArticleEntries
} from './documentation-catalog';

export const docsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./documentation-shell/documentation-shell').then(
        (component) => component.DocumentationShell
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: defaultDocumentationArticleId
      },
      ...documentationArticleEntries.map((article) => ({
        path: article.id,
        loadComponent: () =>
          import('./documentation-article/documentation-article').then(
            (component) => component.DocumentationArticlePage
          ),
        data: { docId: article.id }
      }))
    ]
  }
];
