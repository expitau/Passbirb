const fs = require('fs')
const path = require('path')
require('process').chdir(path.normalize(__dirname + '/../../'))

if (!fs.existsSync("./extension/dist")){
    fs.mkdirSync("./extension/dist");
}

template = fs.readFileSync("extension/src/template.txt.js", "utf8")

bundle = fs.readFileSync("function/dist/bundle.js", "utf8")

fs.readFileSync("extension/src/buildManifest.csv", "utf8").split(",").forEach(file => fs.copyFileSync(`extension/src/${file.trim()}`, `extension/dist/${file.trim()}`))

fs.writeFileSync("extension/dist/content.js", template.replace("/**{{BUNDLE}}**/",bundle))
