import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

interface FeatureCard {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly action: string;
}

@Component({
  selector: 'app-home-page',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  protected readonly cards: readonly FeatureCard[] = [
    {
      id: 'agents',
      icon: 'smart_toy',
      title: 'Agents',
      subtitle: 'Ready to configure',
      description: 'Create assistants for focused research, support, and everyday workflows.',
      action: 'Create agent'
    },
    {
      id: 'activity',
      icon: 'history',
      title: 'Recent activity',
      subtitle: 'No runs yet',
      description: 'Conversations and task history will appear here once your agents get moving.',
      action: 'View history'
    },
    {
      id: 'tools',
      icon: 'extension',
      title: 'Connected tools',
      subtitle: 'Set up integrations',
      description: 'Bring in trusted data sources and actions for capable, grounded assistants.',
      action: 'Browse tools'
    }
  ];
}
