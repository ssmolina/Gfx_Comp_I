var lienzoOrigen;
var lienzoResultado;

var ctxOrigen;
var ctxResultado;

var imgOrigen;
var imgResultado;


document.getElementById('cargar').addEventListener('change', leerImagen);

function prepararResultados()
{ 
  lienzoResultado = document.getElementById('canvas2');
  ctxResultado = lienzoResultado.getContext('2d');
  lienzoResultado.height = lienzoOrigen.height;
  lienzoResultado.width = lienzoOrigen.width;
  imgOrigen = ctxOrigen.getImageData(0, 0, lienzoOrigen.width, lienzoOrigen.height); 
  imgResultado = ctxResultado.createImageData(lienzoOrigen.width, lienzoOrigen.height);
}

function leerImagen(e)
{
  var archivo = e.target.files[0];
  
  if(archivo)
  {
    var lector = new FileReader();
    lector.readAsDataURL(archivo);         
    lector.onload = function(event) { ponerImgEnCanvas(event.target.result); }
  }
}

function ponerImgEnCanvas(datosImg)
{
  var img = new Image();
  img.src = datosImg;

  img.onload = function()
  {
    lienzoOrigen = document.getElementById('canvas');
    ctxOrigen = lienzoOrigen.getContext('2d');
    lienzoOrigen.width=img.width;
    lienzoOrigen.height=img.height;
    ctxOrigen.drawImage(img, 0, 0);
    prepararResultados();
  }
}


function copiar()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {      
      imgResultado.data[i+0] = imgOrigen.data[i+0];
      imgResultado.data[i+1] = imgOrigen.data[i+1];
      imgResultado.data[i+2] = imgOrigen.data[i+2];
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function negativo()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {      
      imgResultado.data[i+0] = 255 - imgOrigen.data[i+0];
      imgResultado.data[i+1] = 255 - imgOrigen.data[i+1];
      imgResultado.data[i+2] = 255 - imgOrigen.data[i+2];
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function Sepia()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
    var gris =  (imgOrigen.data[i+0] * 0.3) + 
                (imgOrigen.data[i+1] * 0.59)+
                (imgOrigen.data[i+2] * 0.11);

    var sepiaRojo = gris +100;
    var sepiaVerde= gris + 50;

    if (sepiaRojo > 255) {sepiaRojo = 255}
    if (sepiaVerde >255) {sepiaVerde= 255}
  
      
      imgResultado.data[i+0] = sepiaRojo;
      imgResultado.data[i+1] = sepiaVerde;
      imgResultado.data[i+2] = gris;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function grisesPromedio()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
      var promedio = (imgOrigen.data[i+0] + imgOrigen.data[i+1] + imgOrigen.data[i+2])/3;
      
      imgResultado.data[i+0] = promedio;
      imgResultado.data[i+1] = promedio;
      imgResultado.data[i+2] = promedio;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function grisesCanal()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
    var gris =  (imgOrigen.data[i+0] * 0.3) + 
                (imgOrigen.data[i+1] * 0.59)+
                (imgOrigen.data[i+2] * 0.11);
      
      imgResultado.data[i+0] = gris;
      imgResultado.data[i+1] = gris;
      imgResultado.data[i+2] = gris;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function filtroRojo()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
      imgResultado.data[i+0] = imgOrigen.data[i+0];
      imgResultado.data[i+1] = 0;
      imgResultado.data[i+2] = 0;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function filtroVerde()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
      imgResultado.data[i+0] = 0;
      imgResultado.data[i+1] = imgOrigen.data[i+1];
      imgResultado.data[i+2] = 0;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function filtroAzul()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
      imgResultado.data[i+0] = 0;
      imgResultado.data[i+1] = 0;
      imgResultado.data[i+2] = imgOrigen.data[i+2];
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function blancoNegro()
{
  var i;
  //var umbral = 128;
  var umbralOriginal = 128;
  var output = document.getElementById("bn");
  var umbral = document.getElementById("sliderBN").value;

  console.log("umbral = " + umbral);
  //var offset = umbral + 78;
  
  /*if(offset<0) {offset *= -1;}  

  if (umbral < 0) { offset *= -1; }
  
  umbral += offset;*/
  
  if (umbral > 255) { umbral = 255; }
  //if (brillo < 0) { brillo = 0; }  // comentando esta linea para que se oscurezca mucho la imagen

  
  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
    var gris =  (imgOrigen.data[i+0] * 0.3) + 
                (imgOrigen.data[i+1] * 0.59)+
                (imgOrigen.data[i+2] * 0.11);
      
      if (gris >= umbral) gris = 255; else gris = 0;

      imgResultado.data[i+0] = gris;
      imgResultado.data[i+1] = gris;
      imgResultado.data[i+2] = gris;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function brillo()
{
  var i;
  var brilloOriginal = 50;
  var output = document.getElementById("brillo");
  var brillo = document.getElementById("sliderBrillo").value - brilloOriginal;
  var offset = brillo * 2;
  
  if(offset<0) {offset *= -1;}  

  if (brillo < 0) { offset *= -1; }
  
  brillo += offset;
  
  if (brillo > 255) { brillo = 255; }
  //if (brillo < 0) { brillo = 0; }  // comentando esta linea para que se oscurezca mucho la imagen

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {      
      imgResultado.data[i+0] = imgOrigen.data[i+0]+brillo;
      imgResultado.data[i+1] = imgOrigen.data[i+1]+brillo;
      imgResultado.data[i+2] = imgOrigen.data[i+2]+brillo;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
  output.innerHTML = brillo;
}


/*function ruido()
{
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
      var rand = Math.random() * 150;

      if (rand > 255) {rand=255;}
      
      imgResultado.data[i+0] = imgOrigen.data[i+0] + rand;
      imgResultado.data[i+1] = imgOrigen.data[i+1] + rand;
      imgResultado.data[i+2] = imgOrigen.data[i+2] + rand;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }

  ctxResultado.putImageData(imgResultado, 0, 0);

}*/