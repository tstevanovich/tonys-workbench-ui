import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { documentationArticles, documentationCategories } from '../documentation-content';

@Component({
  selector: 'app-documentation-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatIcon],
  templateUrl: './documentation-shell.html',
  styleUrl: './documentation-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationShell {
  protected readonly categories = documentationCategories.map((category) => ({
    ...category,
    articles: category.articleIds
      .map((articleId) => documentationArticles.find((article) => article.id === articleId))
      .filter((article) => article !== undefined)
  }));
}
