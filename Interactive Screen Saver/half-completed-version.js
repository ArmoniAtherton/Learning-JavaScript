var canvas = document.querySelector('canvas');
//console.log('hey');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
//this will statically draw shapes to the screen.
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(100, 100, 100, 100);
// console.log(canvas);

// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300)
// c.strokeStyle = "blue";
// c.stroke();

//Arc or Cirlce
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'green';
// c.stroke();

// for (var i = 0; i < 3; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'green';
//     c.stroke();
// }


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
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
        this.draw();
    }
}
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// //Allows for random speed.
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;
var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = 30;
    circleArray.push(new Circle(Math.random() * (innerWidth - radius * 2) + radius, Math.random() * (innerHeight - radius * 2) + radius,
        (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, radius))
}
// var circle = new Circle(Math.random() * innerWidth, Math.random() * innerHeight,
//                         (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, 30);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();