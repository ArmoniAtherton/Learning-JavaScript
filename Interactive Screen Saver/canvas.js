/*
 * canvas.js
 *  
 */ 
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
var MAXRADIUS = 40;
var MINRADIUS = 2;
var colorArray = [
    '#2C3E50', 
    '#E74C3C', 
    '#ECF0F1', 
    '#3498DB',
    '#2980B9'
];
window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = MINRADIUS;
    this.colorArray = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colorArray;
        c.fill();
    }
    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < MAXRADIUS) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];
function init() {

    circleArray = [];
    for (var i = 0; i < 800; i++) {
        //Plus one so that you cant get a value of 0 to get range 1-4.
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(Math.random() * (innerWidth - radius * 2) + radius, Math.random() * (innerHeight - radius * 2) + radius,
            (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, radius))
    }   
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        if (circleArray.length != 0) {
           circleArray[i].update();
        }
    }
    c.font = "100px Impact";
    c.fillStyle = "black";
    c.textAlign = "center";
    c.fillText("Armoni Atherton", canvas.width/2, canvas.height/2); 

}
init();
animate();