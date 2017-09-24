"use strict";

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET /
router.get('/', (req, res, next) => {

  const venta = req.query.venta;
  const mini = parseFloat(req.query.min);
  const max = parseFloat(req.query.max);
  const tags = req.query.tags;
  const nombre = req.query.nombre;
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

  const filter = {};

  if (venta) {
    filter.venta = venta;
  }
  if (tags) {
    filter.tags=tags;
  }
  
  if(nombre)
    filter.nombre=new RegExp('^'+nombre,"i");
//console.log(filter);
  
  Anuncio.lista(filter,mini,max,skip, limit).then( lista => {
    res.json({ success: true, rows: lista });
  }).catch( err => {
    console.log('Error', err);
    err.message = __('find_no_one');
    next(err);
    return;
  });
});

// GET /:id
router.get('/:id', (req, res, next) => {
  const _id = req.params.id;
  Anuncio.findOne({ _id: _id }, (err, anuncio) => {
    if (err) {
      console.log('Error', err);
      next(err);
      return;
    }
    res.json({ success: true, row: anuncio});
  })
});

// POST / 
router.post('/', (req, res, next) => {
  console.log(req.body);
  
  const anuncio = new Anuncio(req.body);

  anuncio.save((err, anuncioGuardado) => {
    if (err) {
      console.log('Error', err);
      next(err); // para que retorne la página de error
      return;
    }
    res.json({ success: true, result: anuncioGuardado});
  });
});

// PUT /
router.put('/:clavedelanuncio', (req, res, next) => {
  const _id = req.params.clavedelanuncio;
  // actualizo con {new: true} para que retorne el anuncioActualizado y no el anterior
  Anuncio.findOneAndUpdate({_id: _id}, req.body, {new: true}, (err, anuncioActualizado) => {
    if (err) {
      console.log('Error', err);
      next(err); // para que retorne la página de error
      return;
    }
    res.json({ success: true, result: anuncioActualizado});    
  });
});

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  Anuncio.remove({ _id: _id }, (err) => {
    if (err) {
      console.log('Error', err);
      next(err); // para que retorne la página de error
      return;
    }
    res.json({ success: true });
  })
});

module.exports = router;