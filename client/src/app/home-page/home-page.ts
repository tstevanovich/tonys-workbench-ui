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
import { RouterLink } from '@angular/router';

interface FeatureCard {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly action: string;
  readonly route: string;
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
    MatIcon,
    RouterLink
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  protected readonly cards: readonly FeatureCard[] = [
    {
      id: 'documentation',
      icon: 'article',
      title: 'Documentation',
      subtitle: 'Living source of truth',
      description: 'Capture the stack, architecture, guides, decisions, and operating model.',
      action: 'Open docs',
      route: '/docs'
    },
    {
      id: 'planner',
      icon: 'checklist',
      title: 'Planner',
      subtitle: 'Ideas into action',
      description: 'Turn thoughts into detailed plans, to-do lists, routines, and automations.',
      action: 'Plan work',
      route: '/planner'
    },
    {
      id: 'ai-studio',
      icon: 'auto_awesome',
      title: 'AI Studio',
      subtitle: 'Creative and practical AI',
      description: 'Build ChatGPT routes, prompts, scripts, dialogue, and OpenArt video workflows.',
      action: 'Open studio',
      route: '/ai-studio'
    },
    {
      id: 'code-lab',
      icon: 'terminal',
      title: 'Code Lab',
      subtitle: 'Guided implementation',
      description: 'Use prompts and Markdown steering files to work with local repositories.',
      action: 'Open code lab',
      route: '/code-lab'
    },
    {
      id: 'integrations',
      icon: 'hub',
      title: 'Integrations',
      subtitle: 'Connected workflows',
      description: 'Connect GitHub, Jira, Confluence, ServiceNow, OpenAI, OpenArt, and more.',
      action: 'Browse integrations',
      route: '/integrations'
    },
    {
      id: 'career',
      icon: 'badge',
      title: 'Career',
      subtitle: 'Recruiter-ready',
      description: 'Shape portfolio content, case studies, resume highlights, and contact paths.',
      action: 'View profile',
      route: '/career'
    }
  ];
}
