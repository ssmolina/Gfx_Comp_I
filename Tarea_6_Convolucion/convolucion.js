var lienzoOrigen;
var lienzoResultado;

var ctxOrigen;
var ctxResultado;

var imgOrigen;
var imgResultado;

var divisor;
var bias;

var mConv;

document.getElementById('cargar').addEventListener('change', ponerImagen);

function prepararResultados()
{
  lienzoResultado = document.getElementById('canvas2');
  ctxResultado = lienzoResultado.getContext('2d');
  lienzoResultado.height = lienzoOrigen.height;
  lienzoResultado.width = lienzoOrigen.width;
  imgOrigen = ctxOrigen.getImageData(0, 0, lienzoOrigen.width, lienzoOrigen.height); 
  imgResultado = ctxResultado.createImageData(lienzoOrigen.width, lienzoOrigen.height);
}

function ponerImagen(e)
{
  var archivo = e.target.files[0];
  if(archivo)
  {
    var lector = new FileReader();
    
    lector.readAsDataURL(archivo);         
    lector.onload = function(event){ ponerImgEnCanvas(event.target.result); }
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

function convolucion(vecinos)
{
  var i=0;
  var ren, col, r=0, g=0, b=0, a=0;

  for(ren=0; ren<3; ren++)
    for(col=0; col<3; col++)
    {
      r+=Math.round(mConv[ren][col]*vecinos[i].r);
      g+=Math.round(mConv[ren][col]*vecinos[i].g);
      b+=Math.round(mConv[ren][col]*vecinos[i].b);
      a=vecinos[i].a;
      i++;
    }

    r = Math.round(r/divisor);
    g = Math.round(g/divisor);
    b =Math.round(b/divisor);

    r += bias; 
    g += bias; 
    b += bias;     

    if (r>255) r=255; if (r<0) r=0;
    if (g>255) g=255; if (g<0) g=0;
    if (b>255) b=255; if (b<0) b=0;
   
    return "rgba("+r+","+g+","+b+","+a+")";
}    

function procesar()
{
  var i;
  var y;
  var x;
  var p;
  var n;
  var pixeles=[];
  var vecinos=[];

  var w = imgOrigen.width;

  for (i = 0; i < imgOrigen.data.length; i+=4)
  {
    pixeles.push({r:imgOrigen.data[i+0], g:imgOrigen.data[i+1],b:imgOrigen.data[i+2],a:imgOrigen.data[i+3]});
  }

  i=w+1;   

  for (y = 1; y < imgOrigen.height-2; y++)
    for(x = 0; x < imgOrigen.width; x++)
    {
      p = [i-w-1, i-w, i-w+1, i-1, i, i+1, i+w-1, i+w, i+w+1];
      for (n=0; n<p.length; n++)
        vecinos.push({r:pixeles[p[n]].r, g: pixeles[p[n]].g, b:pixeles[p[n]].b, a:pixeles[p[n]].a});
      ctxResultado.fillStyle = convolucion(vecinos);
      ctxResultado.fillRect( x, y, 1, 1 );
      i++;
      vecinos = [];
    } 
}

function brillo()
{
  var si, sc, sd, ci, cc, cd, ii, ic, id;

  si = document.getElementById('si').value;
  sc = document.getElementById('sc').value;
  sd = document.getElementById('sd').value;
  ci = document.getElementById('ci').value;
  cc = document.getElementById('cc').value;
  cd = document.getElementById('cd').value;
  ii = document.getElementById('ii').value;
  ic = document.getElementById('ic').value;
  id = document.getElementById('id').value;
  
  mConv= new Array (); 
  mConv[0] = new Array (si, sc, sd); 
  mConv[1] = new Array (ci, cc, cd); 
  mConv[2] = new Array (ii, ic, id);
  
  divisor = document.getElementById('divisor').value;
  //bias = document.getElementById('bias').value;
  //console.log('BIAS = ' +bias);
  bias = 0;
  procesar();
}
