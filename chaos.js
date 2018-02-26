function Chaos(canvasId, times) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");
    this.pointSize = 1;
    this.height = this.canvas.height - this.pointSize;
    this.width = this.canvas.width - this.pointSize;
    this.times = times;
    this.verticies = [
        new Point(0, 0),
        new Point(this.width / 2, this.height),
        new Point(this.width, 0)
    ]
}

Chaos.prototype.plot = function (point) {
    this.ctx.strokeRect(point.x, point.y, this.pointSize, this.pointSize);
}

Chaos.prototype.start = function () {
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
        var chaos = Math.floor(Math.random() * 3);
        var vertex = this.verticies[chaos];
        var newPoint = lastPoint.midPoint(vertex);
        this.plot(newPoint);

    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.midPoint = function (point) {
    var x = (point.x -this.x) / 2 + this.x;
    var y = (point.y -this.y) / 2 + this.y;
    return new Point(x, y);
}


