import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const templates = {
  'real-estate': {
    files: {
      'app/page.tsx': `'use client'; export default function Home() { return <div style={{padding:'100px', textAlign:'center', fontSize:'2rem'}}>Real Estate Tenant Tracker - Built with Astrion 🚀</div>; }`,
      'README.md': '# Real Estate Tenant Tracker\nBuilt with Astrion',
    },
  },
  'housewife': {
    files: {
      'app/page.tsx': `'use client'; export default function Home() { return <div style={{padding:'100px', textAlign:'center', fontSize:'2rem'}}>Housewife Helper - Built with Astrion 🚀</div>; }`,
      'README.md': '# Housewife Helper\nBuilt with Astrion',
    },
  },
  'task-manager': {
    files: {
      'app/page.tsx': `'use client'; export default function Home() { return <div style={{padding:'100px', textAlign:'center', fontSize:'2rem'}}>Personal Task Manager - Built with Astrion 🚀</div>; }`,
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
    const { data: repo } = await octokit.repos.create({
      name: repoName,
      auto_init: true,
      private: false,
    });

    for (const [path, content] of Object.entries(templates[template as keyof typeof templates].files)) {
      await octokit.repos.createOrUpdateFileContents({
        owner: 'yaronmadmon',
        repo: repoName,
        path,
        message: 'initial commit from Astrion',
        content: Buffer.from(content).toString('base64'),
      });
    }

    const url = `https://${repoName}.vercel.app`;

    return NextResponse.json({ url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}