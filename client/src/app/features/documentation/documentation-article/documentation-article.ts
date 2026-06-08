import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { MarkdownRenderer } from '../../../shared/ui/markdown-renderer/markdown-renderer';
import { type DocumentationArticle } from '../documentation.model';
import { documentationArticleEntries, documentationArticleLoaders } from '../documentation-catalog';

@Component({
  selector: 'app-documentation-article',
  imports: [MarkdownRenderer, MatIcon],
  templateUrl: './documentation-article.html',
  styleUrl: './documentation-article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DocumentationArticlePage {
  readonly docId = input.required<string>();

  protected readonly article = signal<DocumentationArticle | undefined>(undefined);
  protected readonly articleIcon = computed(
    () =>
      documentationArticleEntries.find((article) => article.id === this.docId())?.icon ?? 'article'
  );

  private loadSequence = 0;

  constructor() {
    effect(() => {
      const docId = this.docId();
      const loadArticle = documentationArticleLoaders.get(docId);

      if (!loadArticle) {
        throw new Error(`Unknown documentation article: ${docId}`);
      }

      const sequence = ++this.loadSequence;
      this.article.set(undefined);

      void loadArticle().then((article) => {
        if (sequence === this.loadSequence) {
          this.article.set(article);
        }
      });
    });
  }
}
