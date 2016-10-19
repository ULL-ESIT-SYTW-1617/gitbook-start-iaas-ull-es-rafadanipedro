import fs from 'fs'
import path from 'path'

export default function deploy (nombrePlugin) {
  !estamosEnUnGitbook() ? process.exit(1) : ''
  addDevDependency(nombrePlugin)
  anadirTareaAlGulpfile(nombrePlugin)
}

function estamosEnUnGitbook () {
  try {
    require(path.resolve(process.cwd(), 'book.json'))
    return true
  } catch(err) {
    console.error('No se reconoce tu directorio actual como un gitbook')
    return false
  }
}

function addDevDependency(plugin) {
  let packageJson = require(path.resolve(process.cwd(), 'package.json'))
  let packageJsonPlugin = packageJson.devDependencies[plugin]
  if (packageJsonPlugin) {
    console.error(`Ya tienes el plugin ${plugin}`)
    process.exit(1)
  }

  packageJsonPlugin = 'latest'
  fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), JSON.stringify(packageJson, undefined, 2))
}

function anadirTareaAlGulpfile(plugin) {
  let gulpfile
  try {
    gulpfile = fs.readFileSync(path.resolve(process.cwd(), 'gulpfile.babel.js')).toString()
  } catch(err) {
    return console.error('No existe un gulpfile, así que no puedo añadir la tarea')
  }

  let variable = plugin.replace(/-(.)/g, m => m[1].toUpperCase())
  let taskName = variable.replace(/plugin./, m => m.slice(-1).toLowerCase())

  gulpfile = gulpfile.replace(/(gitbook-install')/,
    '$1\n' +
    `import ${variable} from '${plugin}'`
    )

  gulpfile = gulpfile.replace(/(export const deploy.+)\)/, `$1, ${taskName})`)
  gulpfile += getTask(taskName, variable)
  escribirGulpfile(gulpfile)
  console.log(fs.readFileSync(path.resolve(process.cwd(), 'gulpfile.babel.js')).toString())
}

function getTask(taskName, variable) {
  return (`
export function ${taskName} () {
  src('gh-pages').pipe(${variable}.deploy())
}
`
  )
}
function escribirGulpfile(gulpfile){
  fs.writeFileSync(path.resolve(process.cwd(), 'gulpfile.babel.js'), gulpfile)
}