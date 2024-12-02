import path from 'Modules/path.js'
import url from 'url'

const filePath = 'users/name/name.txt'
const __filename = url.fileURLToPath(import.meta.url)

console.log("Basename",path.basename(filePath))
console.log("Dirname",path.dirname(filePath))
console.log("Extension Name",path.extname(filePath))