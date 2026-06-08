import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import {
  defaultDocumentationArticleId,
  documentationArticleEntries,
  documentationCategories
} from '../documentation-catalog';

@Component({
  selector: 'app-documentation-shell',
  imports: [RouterLink, RouterOutlet, MatIcon],
  templateUrl: './documentation-shell.html',
  styleUrl: './documentation-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationShell {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly documentationTop = viewChild<ElementRef<HTMLElement>>('documentationTop');

  readonly categories = documentationCategories.map((category) => ({
    ...category,
    articles: category.articleIds
      .map((articleId) => documentationArticleEntries.find((article) => article.id === articleId))
      .filter((article) => article !== undefined)
  }));

  readonly expandedCategoryId = signal<string | undefined>(
    this.getCategoryIdForArticle(defaultDocumentationArticleId)
  );
  readonly activeArticleId = signal<string>(defaultDocumentationArticleId);

  constructor() {
    this.syncActiveRouteState();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.syncActiveRouteState();
      });
  }

  isExpanded(categoryId: string): boolean {
    return this.expandedCategoryId() === categoryId;
  }

  toggleCategory(categoryId: string): void {
    this.expandedCategoryId.update((expandedCategoryId) =>
      expandedCategoryId === categoryId ? undefined : categoryId
    );
  }

  openArticle(categoryId: string): void {
    this.expandedCategoryId.set(categoryId);
    this.scrollToTop();
  }

  private syncActiveRouteState(): void {
    const activeArticleId = this.getActiveArticleId();

    this.activeArticleId.set(activeArticleId);
    this.expandedCategoryId.set(this.getCategoryIdForArticle(activeArticleId));
  }

  private getActiveArticleId(): string {
    return (
      (this.route.firstChild?.snapshot?.data['docId'] as string | undefined) ??
      defaultDocumentationArticleId
    );
  }

  private getCategoryIdForArticle(articleId: string | undefined): string | undefined {
    return this.categories.find((category) =>
      category.articles.some((article) => article.id === articleId)
    )?.id;
  }

  private scrollToTop(): void {
    const target = this.documentationTop()?.nativeElement;

    if (target) {
      target.scrollIntoView({ block: 'start' });
      return;
    }

    this.document.defaultView?.scrollTo({ top: 0 });
  }
}
