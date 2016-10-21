# Creación de un paquete NPM con despliegue en IAAS. Práctica 4 SYTW

Durante la siguiente práctica se tratará de extender el paquete publicado en la práctica 2 , [Creación de un Paquete NPM ](https://github.com/ULL-ESIT-SYTW-1617/creacion-de-paquetes-y-modulos-en-nodejs-rafadanipedro), en la que se creaba un paquete para realizar la creación de un gitbook. En esta práctica,además, se ha añadido la posibilidad al usuario de desplegar el Gitbook creado en el servicio Iaas de la ULL mediante la utilización de un plugin.

Además de esto, también publicaremos el paquete en la página de npm bajo el usuario [rafadanipedro](https://www.npmjs.com/package/gitbook-start-rafadanipedro).

## Instalación del paquete
Para instalar el paquete debemos de ejecutar el siguiente comando:
`npm --global install gitbook-start-rafadanipedro`

También podemos instalarlo de manera local si queremos eliminando el argumento `--global`.

## Uso del paquete
Para utilizar el paquete solo tenemos que ejecutar el comando `gitbook-start` seguido de los siguientes argumentos:

 `--author`: especifica el autor del libro. Por defecto es el nombre de usuario de GitHub.  
 `--email`: especifica el email del autor del libro. Por defecto es el correo de usuario de git.  
 `--license`: especifica la licencia del libro. Por defecto es "MIT".  
 `--repo`: especifica la direccion del repositorio de GitHub. Por defecto es "https://github.com/'+nombreUsuario/'+nombreRepo".  
 `--ghPages`: especifica la direccion en la que se encuentran las gh-pages generadas. Por defecto es "http://'+nombreUsuario.github.io/'+nombreRepo".  
 `--name`: especifica el nombre del libro. Por defecto este argumento es obligatorio.  
 `--title`: especifica el titulo del libro. Por defecto es el mismo que el nombre del libro.  
`--description`: especifica la descripcion del libro. Por defecto es "Descripcion breve del Gitbook".  
 `--outputDirName`: nombre del directorio a crear. Por defecto es el nombre del libro.

Es obligatorio especificar un nombre para el libro, ya que es el unico argumento obligatorio.

Ejemplo: `gitbook-start mi_libro --author Joselito --email joselito@chuchu.com`

Enlace del plugin utilizado en la práctica:
(https://www.npmjs.com/package/plugin-iaas-rafadanipedro)

## Instalación del plugin
Para instalar el plugin debemos de ejecutar el siguiente comando:
`npm --global install plugin-iaas-rafadanipedro`

## Cómo desplegar un plugin

Para utilizar la función deploy del plugin, se debe realizar de la siguiente manera:

`gitbook-start --deploy <nombre plugin> [options]`

De este modo añadiremos el plugin al gulpfile y su configuración quedará almacenada en el fichero `plugins.json`.

Ejemplo: `gitbook-start --deploy plugin-iaas-rafadanipedro`

## Cómo desarrollar un plugin

Un plugin necesita exportar 2 funciones fundamentales:

* `config()`: Función que expota un objecto con la configuración por defecto del plugin.
* `deploy(oppciones)`: Función que realiza el deploy usando la configuración que se le pasa por argumentos. Devuelve una promesa que se resuelve cuando todo está desplegado.

## Enlace al paquete en npm
 * [Paquete publicado en npm](https://www.npmjs.com/package/gitbook-start-rafadanipedro)

##Enlace al plugin en npm 
  * [Paquete del plugin](https://www.npmjs.com/package/plugin-iaas-rafadanipedro)

## Descripción de la práctica
 * [Gitbook de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicanm.html)

## Comandos para trabajar con el comando al descargar el repositorio
`babel-node <ruta del proyecto en el que trabaja> Pruebecia`
`babel-node <ruta del proyecto en el que trabaja> plugin-iaas-rafadanipedro --author=prueba --host=xxx.xxxx.xxxx.xxx`
`gulp -T`
`gulp iaasRafadanipedro`

## Páginas personales
 
Pinchando sobre las imágenes podrás acceder a nuestras páginas personales.

<a href='https://rafaherrero.github.io' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11819652?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://danielramosacosta.github.io/' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11427028?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://alu0100505078.github.io/' target='_blank'><img src='https://avatars3.githubusercontent.com/u/14938442?v=3&s=400' border='0' alt='postimage' width='100px'/></a>
