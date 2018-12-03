function ponerPixel(contexto, x, y, color){

  contexto.fillStyle = color; //configura el color para pintado

  //pintar un punto (debe ser 1x1, para mejorar su visualizaci�n es de 3x3)
  contexto.fillRect( x, y, 3, 3 );

}

function dibujar(){

  var x = event.offsetX; //obtenemos la abscisa de la ubicaci�n del clic del rat�n

  var y = event.offsetY; //obtenemos la ordenada de la ubicaci�n del clic del rat�n

  var c = formulario.elements["c"].value; //obtenemos el color

  var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo

  var contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo

  ponerPixel(contexto, x, y, c); //pintamos el pixel x,y en color azul

  contexto.fillText( "(" + x + "," + y + ")", x+4, y); //mostramos la coordenada

}







