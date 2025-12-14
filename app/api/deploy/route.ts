import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const templates = {
  'real-estate': {
    name: 'Real Estate Tenant Tracker',
    files: {
      'app/page.tsx': `export default function Home() { return <div>Real Estate Tenant Tracker Dashboard</div>; }`,
      'README.md': '# Real Estate Tenant Tracker\nBuilt with Astrion',
    },
  },
  'housewife': {
    name: 'Housewife Helper',
    files: {
      'app/page.tsx': `export default function Home() { return <div>Housewife Helper - Meal Planner & Grocery List</div>; }`,
      'README.md': '# Housewife Helper\nBuilt with Astrion',
    },
  },
  'task-manager': {
    name: 'Personal Task Manager',
    files: {
      'app/page.tsx': `export default function Home() { return <div>Personal Task Manager</div>; }`,
      'README.md': '# Personal Task Manager\nBuilt with Astrion',
    },
  },
};

export async function POST(request: Request) {
  const { template } = await request.json();

  if (!templates[template as keyof typeof templates]) {
    return NextResponse.json({ error: 'Invalid template' }, { status: 400 });
  }

  const repoName = `astrion-${template}-${Math.random().toString(36).substring(7)}`;

  try {
    // Create repo
    const { data: repo } = await octokit.repos.create({
      name: repoName,
      private: false,
      auto_init: false,
    });

    // Create files
    for (const [path, content] of Object.entries(templates[template as keyof typeof templates].files)) {
      await octokit.repos.createOrUpdateFileContents({
        owner: 'yaronmadmon', // CHANGE TO YOUR GITHUB USERNAME
        repo: repoName,
        path,
        message: 'initial commit from Astrion',
        content: Buffer.from(content).toString('base64'),
      });
    }

    // Return Vercel deploy URL (Vercel auto-deploys when repo is pushed)
    const url = `https://${repoName}.vercel.app`;

    return NextResponse.json({ url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}