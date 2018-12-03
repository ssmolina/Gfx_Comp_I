function ponerPixel(contexto, x, y, r, g, b, a){

  contexto.fillStyle = "rgba("+r+","+g+","+b+","+a+")"; //configura el color para pintado

  //pintar un punto (debe ser 1x1, para mejorar su visualizaci�n es de 3x3)
  contexto.fillRect( x, y, 3, 3 );

}

function dibujar(){ //Esta funci�n es llamada al cargar el documento html

  var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo

  var contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo
  
  for (var x=1; x<=400; x++)
  {
    for (var y=1; y<=400; y++)
    {
      //obtenemos las intensidades de los canales RGBa del pixel al azar
    var r = Math.floor((Math.random() * 255) + 1);  //componente roja entre 0 y 255
    var g = Math.floor((Math.random() * 255) + 1);  //componente verde  entre 0 y 255
    var b = Math.floor((Math.random() * 255) + 1);  //componente azul  entre 0 y 255
    var a = Math.random();  //la transparencia del pixel es un n�mero real entre 0 y 1

    ponerPixel(contexto, x, y, r, g, b, a);  //pintamos el pixel
    }    
  }  
} 
