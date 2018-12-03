
function draw()
{
	var myCanvas = document.getElementById("main_canvas");
	var context = myCanvas.getContext("2d");

	drawPixel(context, 50, 200, "#FF0000");

}

function drawPixel(context, xPos, yPos, color)
{
	context.fillStyle = color;
	context.fillRect(xPos, yPos, 1, 1);

}