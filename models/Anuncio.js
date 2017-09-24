"use strict";

const mongoose = require('mongoose');

// definir un esquema
const anuncioSchema = mongoose.Schema({
  nombre: {
    type: String,
    index: true,
    required: true
  },
  venta: {
    type: Boolean,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  foto: {
    type: String
  },
  tags: [{
    type: String,
    index: true,
    enum: {
        values: ['Work', 'Lifestyle', 'Mobile', 'Motor'],
    }
    
  }]
});

// Añadimos método estático
anuncioSchema.statics.lista = function(filter, mini, max, skip, limit, callback) {
  //console.log(filter);
  const query = Anuncio.find(filter);
  if(mini){
    query.where('precio').gte(mini);
  }
  if(max){
    query.where('precio').lte(max);
  }
  if(filter.tags){
    query.where( { tags: { $all: [filter.tags] } } )
  }
  query.skip(skip);
  query.limit(limit);

  return query.exec(callback); // ejecutamos la consulta
};

// crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
