interface DocumentationSection {
  readonly heading: string;
  readonly body?: string;
  readonly markdown?: string;
  readonly bullets?: readonly string[];
}

export interface DocumentationCategory {
  readonly id: string;
  readonly label: string;
  readonly articleIds: readonly string[];
}

export interface DocumentationArticle {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly sections: readonly DocumentationSection[];
}

export interface DocumentationArticleEntry extends Pick<
  DocumentationArticle,
  'id' | 'title' | 'summary'
> {
  readonly icon: string;
  readonly loadArticle: () => Promise<DocumentationArticle>;
}
