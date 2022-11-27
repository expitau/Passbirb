const fs = require('fs')
require('process').chdir(__dirname)

if (!fs.existsSync("./dist")){
    fs.mkdirSync("./dist");
}

template = fs.readFileSync("./src/template.txt.js", "utf8")

bundle = fs.readFileSync("../function/dist/bundle.js", "utf8")

fs.readFileSync("./src/buildManifest.csv", "utf8").split(",").forEach(file => fs.copyFileSync(`./src/${file.trim()}`, `./dist/${file.trim()}`))

fs.writeFileSync("./dist/content.js", template.replace("/**{{BUNDLE}}**/",bundle))
