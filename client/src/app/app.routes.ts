import { type Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page').then((component) => component.HomePage)
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('./features/documentation/documentation.routes').then((routes) => routes.docsRoutes)
  },
  {
    path: 'planner',
    loadComponent: () =>
      import('./features/workspace-page/workspace-page').then(
        (component) => component.WorkspacePage
      ),
    data: {
      eyebrow: 'Planner',
      title: 'Life planner',
      summary:
        'Turn thoughts, goals, and messy ideas into practical action plans, to-do lists, routines, and automations.',
      capabilities: [
        {
          icon: 'psychology',
          title: 'Thought capture',
          description:
            'Write what is on your mind and shape it into goals, constraints, and next actions.'
        },
        {
          icon: 'checklist',
          title: 'Action plans',
          description:
            'Generate detailed plans with ordered tasks, dependencies, and follow-up reminders.'
        },
        {
          icon: 'automation',
          title: 'Automation queue',
          description:
            'Track which tasks can be automated through connected tools and AI workflows.'
        }
      ]
    }
  },
  {
    path: 'ai-studio',
    loadComponent: () =>
      import('./features/workspace-page/workspace-page').then(
        (component) => component.WorkspacePage
      ),
    data: {
      eyebrow: 'AI Studio',
      title: 'AI studio',
      summary:
        'A workspace for ChatGPT routes, prompt work, scripts, dialogue, OpenArt workflows, and generator research.',
      capabilities: [
        {
          icon: 'chat',
          title: 'ChatGPT routes',
          description:
            'Purpose-built AI experiences for planning, documentation, creative work, and research.'
        },
        {
          icon: 'movie',
          title: 'History video pipeline',
          description: 'Develop prompts, scripts, dialogue, image sets, and video generation plans.'
        },
        {
          icon: 'travel_explore',
          title: 'Generator research',
          description:
            'Track current image and video generator APIs, docs, capabilities, and tradeoffs.'
        }
      ]
    }
  },
  {
    path: 'code-lab',
    loadComponent: () =>
      import('./features/workspace-page/workspace-page').then(
        (component) => component.WorkspacePage
      ),
    data: {
      eyebrow: 'Code Lab',
      title: 'Code lab',
      summary:
        'A guided coding workspace for local repositories, prompt files, architectural notes, reviews, and implementation sessions.',
      capabilities: [
        {
          icon: 'terminal',
          title: 'Repo assistance',
          description:
            'Connect local GitHub repositories and guide code changes with structured prompts.'
        },
        {
          icon: 'description',
          title: 'Prompt steering files',
          description:
            'Use Markdown files to define goals, standards, constraints, and implementation plans.'
        },
        {
          icon: 'difference',
          title: 'Review workflows',
          description: 'Summarize changes, check risks, and prepare PR-ready updates.'
        }
      ]
    }
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/workspace-page/workspace-page').then(
        (component) => component.WorkspacePage
      ),
    data: {
      eyebrow: 'Projects',
      title: 'Projects',
      summary:
        'Track side projects, product ideas, experiments, AI video work, and the decisions that shape them.',
      capabilities: [
        {
          icon: 'view_kanban',
          title: 'Project boards',
          description: 'Organize initiatives by status, priority, effort, and next useful action.'
        },
        {
          icon: 'science',
          title: 'Experiments',
          description: 'Capture trials, outcomes, lessons learned, and reusable patterns.'
        },
        {
          icon: 'history_edu',
          title: 'AI history videos',
          description: 'Manage topics, outlines, prompts, assets, and publishing progress.'
        }
      ]
    }
  },
  {
    path: 'integrations',
    loadComponent: () =>
      import('./features/workspace-page/workspace-page').then(
        (component) => component.WorkspacePage
      ),
    data: {
      eyebrow: 'Integrations',
      title: 'Integrations',
      summary:
        'Connect the workbench to GitHub, Jira, Confluence, ServiceNow, OpenAI, OpenArt, and future tools.',
      capabilities: [
        {
          icon: 'hub',
          title: 'Tool catalog',
          description:
            'Track available integrations, auth needs, API limits, and operational status.'
        },
        {
          icon: 'sync_alt',
          title: 'Workflow bridges',
          description:
            'Move context between planning, code, docs, support tickets, and creative production.'
        },
        {
          icon: 'security',
          title: 'Access control',
          description: 'Respect auth, permissions, secrets, scopes, and tool-specific boundaries.'
        }
      ]
    }
  },
  {
    path: 'career',
    loadComponent: () =>
      import('./features/workspace-page/workspace-page').then(
        (component) => component.WorkspacePage
      ),
    data: {
      eyebrow: 'Career',
      title: 'Career profile',
      summary:
        'A recruiter-facing section for resume highlights, project case studies, technical writing, and contact paths.',
      capabilities: [
        {
          icon: 'badge',
          title: 'Profile',
          description:
            'Present experience, skills, strengths, and the kind of roles worth considering.'
        },
        {
          icon: 'work_history',
          title: 'Case studies',
          description:
            'Turn projects into concise stories about decisions, outcomes, and engineering judgment.'
        },
        {
          icon: 'contact_page',
          title: 'Contact',
          description:
            'Provide clear, professional paths for opportunities while keeping personal control.'
        }
      ]
    }
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/workspace-page/workspace-page').then(
        (component) => component.WorkspacePage
      ),
    data: {
      eyebrow: 'Settings',
      title: 'Settings',
      summary:
        'Manage themes, runtime configuration, auth/session details, integration settings, and developer preferences.',
      capabilities: [
        {
          icon: 'palette',
          title: 'Themes',
          description: 'Choose light and dark themes for everyday work.'
        },
        {
          icon: 'tune',
          title: 'Runtime config',
          description:
            'Review app configuration, feature flags, routing, layout, logging, and tool links.'
        },
        {
          icon: 'manage_accounts',
          title: 'Account and auth',
          description:
            'Prepare for Ping OIDC/OAuth, role mapping, permissions, and session behavior.'
        }
      ]
    }
  },
  {
    path: 'test',
    loadComponent: () =>
      import('./features/test-page/test-page').then((component) => component.TestPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
