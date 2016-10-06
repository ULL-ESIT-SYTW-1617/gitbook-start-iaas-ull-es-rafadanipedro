import minimist from 'minimist'
import fs from 'fs-promise'
import Gitbook from './gitbookStart'
import repoName from 'git-repo-name'
const argv = minimist(process.argv.slice(2))
const nombreRepo = repoName.sync();
let conf = require('../package.json');

(async () => {
const lectura_fichero = (ruta) => {
  return fs.readFile(ruta, 'utf8');;
};

switch(true) {
  case (argv.h || argv.help):
    console.log(await lectura_fichero('./man/gitbook-start-rafadanipedro.1'));
  break;

  case (argv.a || argv.authorinfo):
    console.log("Autor:", conf.author);
    break;

  case (argv.c || argv.contributors):
    console.log("Contribuidores:");
    for (let contributors of conf.contributors){
      console.log("*", contributors);
    }
    break;

  case (argv.v || argv.version):
    console.log("Version:", conf.version);
    break;

  default:
    let author = argv.author || 'Pepe',
    email =  argv.email || 'pepe@pepe.com',
    license =  argv.license || 'MIT' ,
    repo =  argv.repo || 'https://github.com/ULL-ESIT-SYTW-1617/'+nombreRepo,
    ghPages =  argv.ghpages || 'http://ULL-ESIT-SYTW-1617.github.io/'+nombreRepo,
    name = argv.name || 'mi-libro-fantastico',
    title = argv.title || 'Título del Gitbook',
    description = argv.description ||  'Descripción breve del Gitbook';

    let options = {
      author: author,
      email: email,
      license: license,
      repo: repo,
      ghPages: ghPages,
      name: name,
      title: title,
      description: description,
      outputDirName: 'output'
    }

    if(process.argv.length == 2)
      console.log("No recibi ningún argumento, se crea el options por defecto");

    let gitbook = new Gitbook(options)
    await gitbook.write()
}
})().catch(err => console.error(`ERROR: ${err.message}`))
