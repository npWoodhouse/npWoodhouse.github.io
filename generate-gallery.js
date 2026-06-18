const fs = require('fs')
const path = require('path')
const htmlPath = path.join(__dirname, 'galery.html')

// Pixel Art Gallery Tab - Reads image files from Assets/Gallery/pixel_art, updates images.json, and injects HTML into galery.html between markers

const PAfolder = path.join(__dirname, 'Assets', 'Gallery', 'pixel_art')
const PAjsonPath = path.join(PAfolder, 'images.json')
const PAstartMarker = '<!-- PA GALLERY START -->'
const PAendMarker = '<!-- PA GALLERY END -->'

const PAfiles = fs.readdirSync(PAfolder)
  .filter(name => /\.(jpe?g|png|gif|webp)$/i.test(name))

fs.writeFileSync(PAjsonPath, JSON.stringify(PAfiles, null, 2), 'utf8')

const PAgalleryHtml = PAfiles.map(name => `            <div class="col-md-6 mb-3">
              <img src="Assets/Gallery/pixel_art/${encodeURIComponent(name)}" alt="${name}" class="img-fluid">
            </div>`).join('\n')

const PAinsertBlock = `${PAstartMarker}\n          <div class="row">\n${PAgalleryHtml}\n          </div>\n          ${PAendMarker}`

const PAhtml = fs.readFileSync(htmlPath, 'utf8')
const PAstartIndex = PAhtml.indexOf(PAstartMarker)
const PAendIndex = PAhtml.indexOf(PAendMarker, PAstartIndex + PAstartMarker.length)

if (PAstartIndex === -1 || PAendIndex === -1) {
  throw new Error(`Could not find ${PAstartMarker} / ${PAendMarker} markers in ${htmlPath}`)
}

const PAnewHtml = PAhtml.slice(0, PAstartIndex) + PAinsertBlock + PAhtml.slice(PAendIndex + PAendMarker.length)
fs.writeFileSync(htmlPath, PAnewHtml, 'utf8')
console.log(`Generated ${path.relative(__dirname, PAjsonPath)} and updated ${path.relative(__dirname, htmlPath)} with ${PAfiles.length} images`)

// FX Gallery Tab - Reads image files from Assets/Gallery/FX, updates images.json, and injects HTML into galery.html between markers

const FXfolder = path.join(__dirname, 'Assets', 'Gallery', 'FX')
const FXjsonPath = path.join(FXfolder, 'images.json')
const FXstartMarker = '<!-- FX GALLERY START -->'
const FXendMarker = '<!-- FX GALLERY END -->'

const FXfiles = fs.readdirSync(FXfolder)
  .filter(name => /\.(jpe?g|png|gif|webp)$/i.test(name))

fs.writeFileSync(FXjsonPath, JSON.stringify(FXfiles, null, 2), 'utf8')

const FXgalleryHtml = FXfiles.map(name => `            <div class="col-md-6 mb-3">
              <img src="Assets/Gallery/FX/${encodeURIComponent(name)}" alt="${name}" class="img-fluid">
            </div>`).join('\n')

const FXinsertBlock = `${FXstartMarker}\n          <div class="row">\n${FXgalleryHtml}\n          </div>\n          ${FXendMarker}`

const FXhtml = fs.readFileSync(htmlPath, 'utf8')
const FXstartIndex = FXhtml.indexOf(FXstartMarker)
const FXendIndex = FXhtml.indexOf(FXendMarker, FXstartIndex + FXstartMarker.length)

if (FXstartIndex === -1 || FXendIndex === -1) {
  throw new Error(`Could not find ${FXstartMarker} / ${FXendMarker} markers in ${htmlPath}`)
}

const FXnewHtml = FXhtml.slice(0, FXstartIndex) + FXinsertBlock + FXhtml.slice(FXendIndex + FXendMarker.length)
fs.writeFileSync(htmlPath, FXnewHtml, 'utf8')
console.log(`Generated ${path.relative(__dirname, FXjsonPath)} and updated ${path.relative(__dirname, htmlPath)} with ${FXfiles.length} images`)

// To run this script, use: node generate-gallery.js