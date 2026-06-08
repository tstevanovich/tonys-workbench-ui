import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { MarkdownRenderer } from '../../shared/ui/markdown-renderer/markdown-renderer';

interface MarkdownExample {
  readonly title: string;
  readonly description: string;
  readonly markdown: string;
}

@Component({
  selector: 'app-test-page',
  imports: [MarkdownRenderer, MatIcon],
  templateUrl: './test-page.html',
  styleUrl: './test-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPage {
  protected readonly examples: MarkdownExample[] = [
    {
      title: 'Documentation sample',
      description: 'Headings, lists, inline code, blockquotes, tables, and a shell block.',
      markdown: `## Setup checklist

Use this page as a small rendering lab for markdown that will show up in prompts, docs, notes, and chat windows.

- Keep generated files out of source control.
- Prefer feature-first folders for Angular work.
- Use \`npm.cmd\` on Windows when PowerShell script policy gets noisy.

> Markdown should feel readable first. Code blocks need to be easy to scan and easy to copy.

| Area | Current choice |
| --- | --- |
| Parser | ngx-markdown with marked |
| Copy action | Native clipboard button |
| Styling | Shared renderer SCSS |

\`\`\`bash
npm.cmd run lint
npm.cmd run lint:client:styles
npm.cmd run build
\`\`\`
`
    },
    {
      title: 'Angular code block',
      description: 'A TypeScript example with decorators, imports, and a template reference.',
      markdown: `### Standalone component

This is close to the kind of Angular snippet that may show up in implementation notes.

\`\`\`ts
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-note-preview',
  template: '<article>{{ title() }}</article>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotePreview {
  readonly title = input.required<string>();
}
\`\`\`
`
    },
    {
      title: 'Template and styles',
      description: 'HTML and SCSS examples using fenced language labels.',
      markdown: `### Component markup

\`\`\`html
<section class="note-preview" aria-label="Saved note">
  <h2>{{ title }}</h2>
  <button type="button" class="icon-button">
    <mat-icon aria-hidden="true">content_copy</mat-icon>
  </button>
</section>
\`\`\`

\`\`\`scss
.note-preview {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--mat-sys-outline-variant);

  h2 {
    margin: 0;
    color: var(--mat-sys-on-surface);
  }
}
\`\`\`
`
    },
    {
      title: 'Prompt and JSON sample',
      description: 'A mixed prompt-style note with configuration data.',
      markdown: `### Prompt draft

Write a concise implementation plan. Call out risky assumptions and keep the changes scoped to the current feature.

\`\`\`json
{
  "route": "/test",
  "private": true,
  "showInNavigation": false,
  "examples": ["docs", "angular", "prompt"]
}
\`\`\`
`
    }
  ];
}
