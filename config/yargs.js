
const opt = {
  descripcion: {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
  }
}

const argv = require('yargs')
  .command('crear','crea un archivo con las tareas a realizar',opt)
//  .command('listar','muestra las tareas a realizar',opt)
  .command('actualizar','actualiza el archivo con las tareas a realizar',{
    descripcion: {
      demand: true,
      alias: 'd',
      desc: 'Descripcion de la tarea por hacer'
    },
    completado: {
      //demand: true,
      alias: 'c',
      desc: 'Marca como completado la tarea',
      default: true
    }
  })
    .command('borrar','Borra la tarea enviada como parametro',opt)
  .help()
  .argv;

module.exports = {
  argv
}