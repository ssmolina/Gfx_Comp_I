function draw()
{
	var myCanvas = document.getElementById("main_canvas");
	var context = myCanvas.getContext("2d");
	color = "#FF0000";
	context.fillStyle = color;

	drawHorizontalLine(context, 0, 200 );
	drawVerticalLine(context, 200, 0 );
	drawSlashLine(context, 400, 0 );
	drawBackSlashLine(context, 0, 0 );
}

function drawHorizontalLine(context, xPos, yPos)
{	
	for ( ; xPos<=400; xPos++) 
	{
		context.fillRect(xPos, yPos, 1, 1);
	}
}

function drawVerticalLine(context, xPos, yPos)
{		
	for ( ; yPos<=400; yPos++) 
	{
		context.fillRect(xPos, yPos, 1, 1);
	}
}

function drawSlashLine(context, xPos, yPos)
{	
	for ( ; xPos<=0, yPos<=400; xPos--, yPos++) 
	{
		context.fillRect(xPos, yPos, 1, 1);		
	}
}

function drawBackSlashLine(context, xPos, yPos)
{	
	for ( ; xPos<=400, yPos<=400; xPos++, yPos++) 
	{
		context.fillRect(xPos, yPos, 1, 1);		
	}
}

