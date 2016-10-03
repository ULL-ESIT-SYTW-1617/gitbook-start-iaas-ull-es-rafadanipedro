import fs from 'fs-promise'
import ejs from 'ejs'
import path from 'path'

export default class Gitbook {
  constructor (options) {
    console.log('Las opciones que me has pasado son:')
    console.log(options)
    // this.options = options
    // Para probar:
    this.options = {
      author: 'Pepe',
      email: 'pepe@pepe.com',
      license: 'MIT',
      repo: 'https://github.com/ULL-ESIT-SYTW-1617/tareas-iniciales-rafadanipedro',
      ghPages: 'http://ULL-ESIT-SYTW-1617.github.io/tareas-iniciales-rafadanipedro',
      name: 'mi-libro-fantastico',
      title: 'Título del Gitbook',
      description: 'Descripción breve del Gitbook',
      outputDirName: 'output'
    }
  }

  async write () {
    console.log('Debería escribir los ficheros')
    let file = await fs.readFile('template/package.json.ejs', {encoding: 'utf8'})
    let output = ejs.render(file, this.options)
    await this.renderTempalte('template', this.options)
  }

  async renderTempalte (directory, options) {
    try {
      await fs.mkdir(directory.replace(/template/, options.outputDirName))
    } catch (err) {
      if (err.message.match(/file already exists/)) {
        //throw new Error(`El directorio ${err.message.match(/'(.+)'/)[1]} ya existe`)
        console.log('pato')
      } else {
        throw err
      }
    }
    let files = await fs.readdir(directory)
    let promises = []
    for(let file of files) {
      let filePath = path.resolve(directory, file)
      let outputFile = filePath.replace(/template/, options.outputDirName)
      let stat = await fs.stat(filePath)
      if (stat.isDirectory()) {
        promises.push(this.renderTempalte(filePath, options))
      } else {
        let output = await fs.readFile(filePath, {encoding: 'utf8'})
        if (filePath.match(/\.ejs$/)) {
          outputFile = outputFile.slice(0, -4)
          output = ejs.render(output, this.options)
        }
        promises.push(fs.writeFile(outputFile, output))
      }
    }
    return Promise.all(promises)
  }
}
