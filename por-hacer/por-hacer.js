
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

  let data = JSON.stringify(listadoPorHacer);

  return new Promise((resolve, rejected) => {

    fs.writeFile(`DB/data.json`, data, (err) => {
      if (err) {
        rejected('No se pudo grabar el archivo')

        // o tambien
        //throw new Error('No se pudo grabar el archivo',err)
      }
      else {
        resolve('Tareas-por-hacer.json')
      }
    })
  })
}

const cargarDB = () => {

  try {
    listadoPorHacer = require('../DB/data.json')
  } catch (error) {
    listadoPorHacer = []
  }
}

const crear = (descripcion) => {

  cargarDB();

  let tarea = {
    //descripcion: descripcion,
    descripcion,
    completado: false
  };

  listadoPorHacer.push(tarea)
  guardarDB()
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err))

  return tarea;
}

const getlistado = () => {
  cargarDB();
  return listadoPorHacer
}

const actualizar = (descripcion, completado) => {

  cargarDB();
  let index = listadoPorHacer.findIndex(tarea => descripcion === tarea.descripcion)
  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB()
    return true
  } else {
    return false
  }
}

const borrar = descripcion => {

  cargarDB();

  let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

  if (index >= 0) {

    let borrado = listadoPorHacer.splice(index, 1)
    guardarDB();
    return borrado
  
  } else {
    return false
  }

  /* o tambien lo puedo hacer con .filter de la siguiente forma

  let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

  if (listadoPorHacer.length === nuevoListado.length) {
    return false;
  } else {
    listadoPorHacer = nuevoListado
    guardarDB()
    return true;
  }

  */
}

module.exports = {
  crear,
  cargarDB,
  getlistado,
  actualizar,
  borrar
}