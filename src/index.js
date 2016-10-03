import minimist from 'minimist'
import Gitbook from './gitbookStart'

const argv = minimist(process.argv.slice(2))

console.dir(argv);

let options = {
  autor: 'Pepe Ramirez'
}

let gitbook = new Gitbook(options)
gitbook.write()
