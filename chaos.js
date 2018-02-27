function Chaos(canvasId) {
    this.tInput = document.getElementById('times');
    this.times = parseInt(this.tInput.value, 10) || 10000;
    this.tInput.value = this.times;
    this.sInput = document.getElementById('sides');
    this.sides = parseInt(this.sInput.value, 10) || 1 ;
    this.sInput.value = this.sides;
    this.rInput = document.getElementById('ratio')
    this.ratio = parseFloat(this.rInput.value) || 0;
    this.rInput.value = this.ratio;

    this.canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "rgba(0,0,0,1)";
    this.ctx.clearRect(0,0,this.width, this.height);
    this.pointSize = 1;
    this.height = this.canvas.height - this.pointSize;
    this.width = this.canvas.width - this.pointSize;
    this.makeVerticies();
}

Chaos.prototype.makeVerticies = function (n) {
    this.verticies = [];
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
    this.ctx.fillRect( point.x, point.y, 1, 1 );

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
        if (_this.ratio > 2.0) {
            _this.sides++;
            _this.sInput.value = _this.sides;
            _this.ratio = .001;
            _this.makeVerticies();
        }
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


