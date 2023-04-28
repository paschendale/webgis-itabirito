module.exports = {
  branches: ['develop'],
  repositoryUrl: 'https://github.com/paschendale/webgis-itabirito',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git', {
        'assets': ['app/package.json'],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ],
  pkgRoot: 'app'
};
