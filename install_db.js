console.log('ooo');
const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio');
const datos=require( './datos' );
const db = mongoose.connection;


//mongoose.connect('mongodb://localhost:27017/anuncios');
mongoose.connect('mongodb://localhost/anuncios');

async function vaciarbd(){
    return (db.dropDatabase(function(err){
        if(err){
         console.log('Error', err);
         next(err);        
         return;
        }
        console.log("Base de datos Borrada");
     }));
 } 

async function insertabd(){
    return (
      db.collection("anuncios").insertMany(datos, function(err, insertados) {
          if (err) throw err;
           console.log("Numero de anuncios insertados " + insertados.insertedCount);
           db.close()
      }));
}

async function main() {
    await vaciarbd();
    await insertabd();
}

main();