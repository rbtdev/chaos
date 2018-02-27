function Chaos(canvasId) {
    this.times = parseInt(document.getElementById('times').value, 10);
    this.sides = parseInt(document.getElementById('sides').value, 10);
    this.rInput = document.getElementById('ratio')
    var r = parseFloat(this.rInput.value);
    this.ratio = r?r:0.5;

    this.canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");
    this.ctx.clearRect(0,0,this.width, this.height);
    this.pointSize = 1;
    this.height = this.canvas.height - this.pointSize;
    this.width = this.canvas.width - this.pointSize;
    this.verticies = [];
    this.makeVerticies(this.points);
}

Chaos.prototype.makeVerticies = function (n) {
    var radius = Math.min(this.width, this.height)/2;
    var angle = 2*Math.PI/this.sides;
    var rot = Math.PI/2;
    for (var point = 0; point < this.sides; point++) {
        var x = radius*Math.cos(angle*point+rot);
        var y = radius*Math.sin(angle*point+rot);
        x = x + radius;
        y = y + radius;
        this.verticies.push(new Point(x,y));
    }
}


Chaos.prototype.plot = function (point) {
    this.ctx.strokeRect(point.x, point.y, this.pointSize, this.pointSize);
}

Chaos.prototype.start = function () {
    this.ctx.clearRect(0,0,this.width, this.height);
    var _this = this;
    this.verticies.forEach(function (vertex) {
        _this.plot(vertex);
    })
    var newPoint = new Point(
        Math.random() * this.width,
        Math.random() * this.height
    );

    this.plot(newPoint);
    var times = 0;
    for (var times = 0; times < this.times; times++) {
        var lastPoint = newPoint;
        var chaos = Math.floor(Math.random() * this.verticies.length);
        var vertex = this.verticies[chaos];
        var newPoint = lastPoint.midPoint(vertex, this.ratio);
        this.plot(newPoint);

    }
    setTimeout(function () {
        _this.ratio += .001;
        _this.rInput.value = _this.ratio;
        _this.start();
    }, 1000/50)
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.midPoint = function (point, ratio) {
    var x = (point.x -this.x)*ratio + this.x;
    var y = (point.y -this.y)*ratio + this.y;
    return new Point(x, y);
}


