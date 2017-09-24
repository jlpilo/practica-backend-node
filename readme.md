** Practica Backend con nodejs

Ejecutar npm install

Para inicializar la base de datos ejecutar npm run instalDB

Para inicuar a aplicacion ejecutar nodemon

En el navegador se accede en localhost:3000
La web muestra un listado de 6 anuncios por pagina.
En la izquierda están los fitros para buscara por nombre, venta/compra, rangpo de precios y etiquetas.

En la opicion "nuevo anuncio" se muestra un formuario para subir un anuncio nuevo.

Se pueden hacer peticiones GET, PUT, POST Y DELETE a taves de url con estos datos:
url: http://localhost:3000/apiv1/anuncios
parametros:
nombre: nombre
venta o compra: venta
precio: precio
para rango de precios precio minimo : min
para rango de precios precio maximo: max
salto de registros: skip
numero de regitros devultos: limit

El listado de tags disponibles se optiene en http://localhost:3000/apiv1/tags
Las imagenes estan fisicamente en la carpeta nodepop/public/images y accesibles desde la url http://localhost:3000/anuncios/images/ por ejemplo http://localhost:3000/anuncios/images/a4.jpg

