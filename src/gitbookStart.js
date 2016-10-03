import fs from 'fs-promise'
import ejs from 'ejs'
import path from 'path'

export default class Gitbook {
  constructor (options) {
    this.options = options
  }

  async write () {
    await this.renderTempalte('template', this.options.outputDirName, this.options)
  }

  async renderTempalte (origin, dest, options) {
    try {
      await fs.mkdir(dest)
    } catch (err) {
      if (err.message.match(/file already exists/)) {
        throw new Error(`El directorio ${err.message.match(/'(.+)'/)[1]} ya existe`)
      } else {
        throw err
      }
    }
    let files = await fs.readdir(origin)
    let promises = []
    for(let file of files) {
      let originPath = path.resolve(origin, file)
      let outputPath = path.resolve(dest, file)
      let stat = await fs.stat(originPath)
      if (stat.isDirectory()) {
        promises.push(this.renderTempalte(originPath, outputPath, options))
      } else {
        let output = await fs.readFile(originPath, {encoding: 'utf8'})
        if (originPath.match(/\.ejs$/)) {
          outputPath = outputPath.slice(0, -4)
          output = ejs.render(output, this.options)
        }
        promises.push(fs.writeFile(outputPath, output))
      }
    }
    return Promise.all(promises)
  }
}
