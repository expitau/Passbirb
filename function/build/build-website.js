const fs = require('fs')
const path = require('path')
const sass = require('sass')

require('process').chdir(path.normalize(__dirname + '/../../'))

if (!fs.existsSync("website/dist")) {
    fs.mkdirSync("website/dist");
}

bundle = fs.readFileSync("function/dist/bundle.js", "utf8")
zxcvbn = fs.readFileSync("function/dist/zxcvbn.js", "utf8")

fs.writeFileSync("website/dist/bundle.js", bundle)
fs.writeFileSync("website/dist/zxcvbn.js", zxcvbn)
fs.readFileSync("website/src/buildManifest.csv", "utf8").split(",").forEach(file => fs.copyFileSync(`website/src/${file.trim()}`, `website/dist/${file.trim()}`))

fs.readdirSync("website/src").filter(fileName => !fileName.startsWith("_") && (fileName.endsWith(".scss") || fileName.endsWith(".sass"))).forEach(sassFile => {
    fs.writeFileSync(`website/dist/${sassFile.replace(/\..*$/, '')}.css`, sass.compile(`website/src/${sassFile}`).css)
    // fs.writeFileSync(`website/dist/${sassFile.replace(/\.s[ca]ss$/,'')}.css`,sass.compile(`website/src/${sassFile}`,{style: "compressed"}).css)
})
