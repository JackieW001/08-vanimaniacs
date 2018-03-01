
var clear = document.getElementById('clear');
var svg = document.getElementById('svg');
var stopButton = document.getElementById('stop');
var shrinkButton = document.getElementById('shrink');
var bounceButton = document.getElementById('bounce');

var lastX = 0;
var lastY = 0;

var requestID;


var shrink = function(){

    clearInterval(requestID);
    
    var posX = 250;
    var posY = 250;
    var radius = 0;
    var maxRad = 250;
    var grow = true;
    
    var draw = function(){

	clear_can();
	//Draw circle
	var c = document.createElementNS("http://www.w3.org/2000/svg","circle")
	c.setAttribute("cx", posX);
	c.setAttribute("cy", posY);
	c.setAttribute("r", radius);
	c.setAttribute("fill", "blue");

	svg.appendChild(c);

	if (grow){
	    radius++;
	    if (radius >= maxRad){
		grow = !grow;
	    }
	}
	else{
	    radius--;
	    if (radius <= 1){
		grow = !grow;
	    }
	}

    }
    requestID = setInterval(draw,10);
    draw();
}

shrinkButton.addEventListener("click",shrink);


var bounce = function(){
    
    clearInterval(requestID);
    
    var posX = 250;
    var posY = 250;
    var radius = 20;
    var moveX = Math.floor(Math.random()*10)+1;
    var moveY = Math.floor(Math.random()*10)+1;
    
    var draw = function(){
	clear_can();

	var c = document.createElementNS("http://www.w3.org/2000/svg","circle")
	c.setAttribute("cx", posX);
	c.setAttribute("cy", posY);
	c.setAttribute("r", radius);
	c.setAttribute("fill", "blue");

	svg.appendChild(c);
	
	posX += moveX;
	posY += moveY;
	
	//bottom
	if (posY >= 500-radius){
	    moveY = -moveY;
	}

	//right
	if (posX >= 500-radius){
	    moveX = -moveX;
	}

	//left
	if (posX <= 0+radius){
	    moveX = -moveX;
	}

	//top
	if (posY <= 0+radius){
	    moveY = -moveY;
	}
	
    }
    requestID = setInterval(draw,10);
    draw();
}

bounceButton.addEventListener("click",bounce);


var clear_can = function(e){
    while(svg.firstChild){
	svg.removeChild(svg.firstChild);
    }
    firstCircle = true;
}

clear.addEventListener("click", clear_can);

var stop_it = function(){
    clearInterval(requestID);
}
stopButton.addEventListener( "click", stop_it )
