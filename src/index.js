import minimist from 'minimist'
import Gitbook from './gitbookStart'
import repoName from 'git-repo-name'
const argv = minimist(process.argv.slice(2))
const nombreRepo = repoName.sync();
console.dir(argv);
console.log(argv.author);
console.log(argv.email);
console.log(argv.license);
console.log(argv.name);
console.log(argv.title);
console.log(argv.description);
let author = argv.author || 'Pepe',
    email =  argv.email || 'pepe@pepe.com',
    license =  argv.license || 'MIT' ,
    repo =  argv.repo || 'https://github.com/ULL-ESIT-SYTW-1617/'+nombreRepo,
    ghPages =  argv.ghpages || 'http://ULL-ESIT-SYTW-1617.github.io/'+nombreRepo,
    name = argv.name || 'mi-libro-fantastico',
    title = argv.title || 'Título del Gitbook',
    description = argv.description ||  'Descripción breve del Gitbook';
console.log(author);
console.log(email);
console.log(license);
console.log(repo);
console.log(ghPages);
console.log(name);
console.log(title);
console.log(description);
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
if(process.argv.length == 2){
  console.log("no recibi ningún argumento, se crea el options por defecto");
}else{
  console.log("se pasa option creado");
  }
options={...options,...argv};
let gitbook = new Gitbook(options)
gitbook.write().then(function(data){console.log(data)})
