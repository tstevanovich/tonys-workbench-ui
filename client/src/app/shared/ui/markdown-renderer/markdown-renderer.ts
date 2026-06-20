import './languages';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  Renderer2,
  viewChild,
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

  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private readonly copyButtonCleanups: (() => void)[] = [];

  private readonly markdownHost = viewChild<unknown, ElementRef<HTMLElement>>('markdownHost', {
    read: ElementRef
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearCopyButtonListeners();
    });
  }

  protected addCopyButtons(): void {
    this.clearCopyButtonListeners();

    const host = this.markdownHost()?.nativeElement;

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
    if (await this.writeToClipboard(pre.innerText)) {
      this.showCopiedState(button);
    }
  }

  private async writeToClipboard(text: string): Promise<boolean> {
    if (!globalThis.navigator?.clipboard) {
      return false;
    }

    try {
      await globalThis.navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
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
