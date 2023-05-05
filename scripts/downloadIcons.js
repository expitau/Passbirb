import fs from 'fs'
import path from 'path'

let icons = {
    "arrow_drop_down": {},
    "arrow_drop_up": {},
    "close": {},
    "content_copy": {},
    "dark_mode": {},
    "expand_more": {},
    "key": {weight: 700, opticalSize: 48},
    "light_mode": {},
    "lock": {weight: 700, opticalSize: 48},
    "scan_delete": {weight: 700, opticalSize: 48},
    "visibility_off": {},
    "visibility": {},
}

let outputDir = path.join(process.cwd(), 'src/assets/icons/');

// Download material symbols
for (let key in icons) {
    let defaults = { fill: false, weight: 300, grade: 0, opticalSize: 24, name: key }
    let icon = { ...defaults, ...icons[key] }
    let iconName = icon.name
    let url;
    if (icon.fill == false && icon.weight == 400 && icon.grade == 0) {
        url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${iconName}/default/24px.svg`
    } else {
        url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${iconName}/`
        if (icon.weight != 400) {
            url += 'wght' + icon.weight
        }
        if (icon.grade > 0) {
            url += 'grad' + icon.grade
        }
        if (icon.grade < 0) {
            url += 'gradN' + -icon.grade
        }
        if (icon.fill) {
            url += 'fill1'
        }
        url += '/'
        if (icon.opticalSize) {
            url += icon.opticalSize
        }
        url += 'px.svg'
    }
    let filename = path.join(outputDir, iconName + '.svg')
    console.log(`Downloading ${url} to ${filename}`)
    fetch(url).then(response => response.text()).then(text => {
        text = text.replace(/^<svg([^>]*)>/gi, `<svg$1 fill="currentColor">`)
        fs.writeFileSync(filename, text)
    })
}
