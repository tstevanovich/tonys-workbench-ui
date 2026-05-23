import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';

import { documentationArticles } from '../documentation-content';

@Component({
  selector: 'app-documentation-article',
  imports: [MarkdownComponent, MatIcon],
  templateUrl: './documentation-article.html',
  styleUrl: './documentation-article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DocumentationArticlePage {
  readonly docId = input.required<string>();

  protected readonly article = computed(() => {
    const article = documentationArticles.find((item) => item.id === this.docId());

    if (!article) {
      throw new Error(`Unknown documentation article: ${this.docId()}`);
    }

    return article;
  });
}
