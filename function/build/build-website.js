const fs = require('fs')
const path = require('path')
require('process').chdir(path.normalize(__dirname + '/../../'))

bundle = fs.readFileSync("function/dist/bundle.js", "utf8")

fs.writeFileSync("public/bundle.js", bundle)

// const fs = require('fs')
// const path = require('path')
// const { marked } = require('marked');
// require('process').chdir(path.normalize(__dirname + '/../../'))

// const readMe = fs.readFileSync('README.md', 'utf-8');
// const markdownReadMe = marked(readMe);

// fs.writeFileSync('public/README.html', markdownReadMe);
