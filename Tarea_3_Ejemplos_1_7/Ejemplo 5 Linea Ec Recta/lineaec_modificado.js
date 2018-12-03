//xi, yi se usan para guardar las coordenadas del primer punto de la recta
var xi=0; 
var yi=0;

//la recta se define por dos puntos, el punto inicial de la recta
//ser� la posici�n donde se haga clic por primera vez y el punto
//final estara definido por la ubicaci�n del segundo clic
var primerPunto=true;  //bandera para controlar los clics

function ponerPixel(contexto, x,y, color){
    contexto.fillStyle = color;
    contexto.fillRect(x, y, 3, 3);  // se modifica el grosor de la linea a 3x3
}                                   // para mejor visibilidad

//Para pintar una recta esta funci�n deber� ser ejecutada dos veces
//la primera vez captura las coordenadas del punto incial de la recta
// y lo grafica sobre el lienzo. La segunda vez toma las coordenadas
//del segundo punto y pinta la l�nea llamando a la funci�n lineaEcuacionRecta.
function dibujar(event){ //Esta funci�n se ejecuta cada que se hace clic sobre el lienzo

  var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
  var contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo

  if(primerPunto){  //Si es el primer clic, se lee el primer punto de la l�nea
    xi=event.offsetX;  //Guardamos la abscisa
    yi=event.offsetY;  //guardamos la ordenada
    ponerPixel(contexto, xi, yi, "#00FF00");  //ponemos el punto inicial en verde
  }
  else  //Si es el segundo clic, pintamos la l�nea con los valores xi, yi
        //y la posici�n del �ltimo clic del rat�n (event.offsetX, event.offsetY)
    lineaEcuacionRecta(xi, yi, event.offsetX, event.offsetY, contexto, "#00FF00");
  primerPunto =! primerPunto;
  
}

function lineaEcuacionRecta(x0, y0, x1, y1, contexto, color)
{
  if (x0 >= x1)
  {
    var m=(y0-y1)/(x0-x1); //calcular pendiente
    var b= y1 - (m*x1);    //determinar el punto donde la recta se cruza con el eje y

    for(var x=x1; x<=x0; x++){ //Se asume que el punto inicial est� m�s a la izq q el final
      var y= (m*x)+b;     //Ecuaci�n de la recta
    
      ponerPixel(contexto, x, Math.round(y), color);  //pintar el siguiente punto de la l�nea
      }
  }
  else
  {
    var m=(y1-y0)/(x1-x0); //calcular pendiente
    var b= y0 - (m*x0);    //determinar el punto donde la recta se cruza con el eje y

    for(var x=x0; x<=x1; x++){ //Se asume que el punto inicial est� m�s a la izq q el final
      var y= (m*x)+b;     //Ecuaci�n de la recta
    
      ponerPixel(contexto, x, Math.round(y), color);  //pintar el siguiente punto de la l�nea
  }
  
  }

}
