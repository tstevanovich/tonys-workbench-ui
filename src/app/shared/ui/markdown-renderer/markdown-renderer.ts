import './languages';

import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-markdown-renderer',
  imports: [MarkdownComponent],
  templateUrl: './markdown-renderer.html',
  styleUrl: './markdown-renderer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MarkdownRenderer {
  readonly content = input.required<string>();

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private readonly copyButtonCleanups: (() => void)[] = [];

  @ViewChild('markdownHost', { read: ElementRef })
  private markdownHost?: ElementRef<HTMLElement>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearCopyButtonListeners();
    });
  }

  protected addCopyButtons(): void {
    this.clearCopyButtonListeners();

    const host = this.markdownHost?.nativeElement;

    if (!host) {
      return;
    }

    host.querySelectorAll('pre').forEach((pre) => {
      const parent = pre.parentNode;

      if (!parent) {
        return;
      }

      const wrapper = this.renderer.createElement('div') as HTMLDivElement;
      const button = this.createCopyButton();

      this.renderer.addClass(wrapper, 'app-markdown-code-block');
      this.renderer.insertBefore(parent, wrapper, pre);
      this.renderer.removeChild(parent, pre);
      this.renderer.appendChild(wrapper, button);
      this.renderer.appendChild(wrapper, pre);

      this.copyButtonCleanups.push(
        this.renderer.listen(button, 'click', () => {
          void this.copyCodeBlock(pre, button);
        })
      );
    });
  }

  private clearCopyButtonListeners(): void {
    this.copyButtonCleanups.splice(0).forEach((cleanup) => {
      cleanup();
    });
  }

  private createCopyButton(): HTMLButtonElement {
    const button = this.renderer.createElement('button') as HTMLButtonElement;
    const icon = this.renderer.createElement('span') as HTMLSpanElement;

    this.renderer.addClass(button, 'app-markdown-copy-button');
    this.renderer.setAttribute(button, 'type', 'button');
    this.renderer.setAttribute(button, 'aria-label', 'Copy code');
    this.renderer.setAttribute(button, 'title', 'Copy code');

    this.renderer.addClass(icon, 'material-symbols-outlined');
    this.renderer.setAttribute(icon, 'aria-hidden', 'true');
    this.renderer.setProperty(icon, 'textContent', 'content_copy');
    this.renderer.appendChild(button, icon);

    return button;
  }

  private async copyCodeBlock(pre: HTMLPreElement, button: HTMLButtonElement): Promise<void> {
    await this.writeToClipboard(pre.innerText);
    this.showCopiedState(button);
  }

  private async writeToClipboard(text: string): Promise<void> {
    if (globalThis.navigator?.clipboard) {
      await globalThis.navigator.clipboard.writeText(text);
      return;
    }

    const textarea = this.renderer.createElement('textarea') as HTMLTextAreaElement;

    this.renderer.setStyle(textarea, 'position', 'fixed');
    this.renderer.setStyle(textarea, 'opacity', '0');
    this.renderer.setProperty(textarea, 'value', text);
    this.renderer.appendChild(this.document.body, textarea);
    textarea.select();
    this.document.execCommand('copy');
    this.renderer.removeChild(this.document.body, textarea);
  }

  private showCopiedState(button: HTMLButtonElement): void {
    const icon = button.querySelector('.material-symbols-outlined');

    this.renderer.addClass(button, 'copied');
    this.renderer.setAttribute(button, 'aria-label', 'Code copied');
    this.renderer.setAttribute(button, 'title', 'Code copied');

    if (icon) {
      this.renderer.setProperty(icon, 'textContent', 'check');
    }

    globalThis.setTimeout(() => {
      this.renderer.removeClass(button, 'copied');
      this.renderer.setAttribute(button, 'aria-label', 'Copy code');
      this.renderer.setAttribute(button, 'title', 'Copy code');

      if (icon) {
        this.renderer.setProperty(icon, 'textContent', 'content_copy');
      }
    }, 1800);
  }
}
