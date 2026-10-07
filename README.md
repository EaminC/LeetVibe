# LeetVibe

LeetVibe is a LeetCode learning journal.

The idea is simple: pick a problem, learn through an AI conversation, implement
the solution, and keep the final note as a durable record. This project does not
connect to an AI API. It records what AI helped me understand and the code I
eventually want to keep.

## Workflow

1. Pick a LeetCode problem.
2. Talk through the constraints, edge cases, and solution ideas elsewhere.
3. Implement the solution yourself.
4. Add one note under `content/problems`.
5. Push to GitHub and let Vercel publish the updated journal.

## Note format

Create a new file like:

```text
content/problems/YYYY-MM-DD-problem-slug.mdx
```

Use this frontmatter:

```yaml
---
title: "Two Sum"
leetcodeUrl: "https://leetcode.com/problems/two-sum/"
difficulty: "Easy"
tags:
  - Array
  - Hash Table
date: "2026-10-06"
status: "Solved"
summary: "Use a hash map to remember complements while scanning once."
---
```

Suggested sections:

- `Problem`: short problem summary
- `Vibe`: what the AI conversation taught me, including hints and mistakes
- `Solution`: final approach
- `Implementation`: code
- `Complexity`: time and space complexity
- `Reflection`: what to remember next time

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

## Deployment

This project is designed for Vercel:

1. Push the repo to `https://github.com/EaminC/LeetVibe`.
2. Import the repo in Vercel.
3. Keep the default Next.js build settings.
4. Use `https://leet-vibe.vercel.app` as the public entry point, or update the
   personal blog link if Vercel assigns a different URL.
