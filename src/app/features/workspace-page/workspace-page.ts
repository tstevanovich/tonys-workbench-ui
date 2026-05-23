import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

interface WorkspaceCapability {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

interface WorkspacePageData {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly capabilities: readonly WorkspaceCapability[];
}

@Component({
  selector: 'app-workspace-page',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIcon],
  templateUrl: './workspace-page.html',
  styleUrl: './workspace-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspacePage {
  private readonly route = inject(ActivatedRoute);

  protected readonly page = computed(() => this.route.snapshot.data as WorkspacePageData);
}
