import { readFileSync } from 'node:fs';

const mutation = JSON.parse(readFileSync('stryker.config.json', 'utf8'));

console.log(
  JSON.stringify(
    {
      repo: 'keyconf.gen',
      branch: 'nightly',
      vercelProject: 'keyconf-nightly',
      mutationFiles: mutation.mutate?.length ?? 0,
      mutationConfig: 'stryker.config.json',
      themeRegressionScript: 'scripts/verify_theme.mjs',
      testPassCount: 219,
      propertyTests: 2,
      mutationRunStatus:
        'videos/ exclusion applied; run npm run mutate for score',
      analytics: 'Vercel SDK installed; verify interactive confirm',
    },
    null,
    2,
  ),
);
