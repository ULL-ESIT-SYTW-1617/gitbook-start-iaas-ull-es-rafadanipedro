import minimist from 'minimist'
import Gitbook from './gitbookStart'

const argv = minimist(process.argv.slice(2))

console.dir(argv);
console.log(argv.author);
console.log(argv.email);
console.log(argv.license);
console.log(argv.name);
console.log(argv.title);
console.log(argv.description);
 let options = {
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
if(process.argv.length == 2){
  console.log("no recibi ningún argumento, se crea el options por defecto");
}else{
  console.log("se pasa option creado");
  }
options={...options,...argv};
let gitbook = new Gitbook(options)
gitbook.write().then(function(data){console.log(data)})
