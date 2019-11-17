const ghpages = require('gh-pages')

ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/kirubarajan/kirubarajan.github.io.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)