var chaos

function init(canvasId) {
    chaos = new Chaos(canvasId);
}

function Chaos(canvasId) {
    this.tInput = document.getElementById('times');
    this.sInput = document.getElementById('sides');
    this.rInput = document.getElementById('ratio')
    this.canvas = document.getElementById(canvasId);
    this.startButton = document.getElementById('start');
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "rgba(0,0,0,1)";
    this.pointSize = 1;
    this.height = this.canvas.height
    this.width = this.canvas.width
}

Chaos.prototype.stop = function () {
    cancelAnimationFrame(this.req);
    this.tInput.disabled = false;
    this.rInput.disabled = false;
    this.sInput.disabled = false;
    this.startButton.textContent = 'Start';
    this.startButton.onclick = this.start.bind(this);
}

Chaos.prototype.start = function () {
    this.run();
    this.tInput.disabled = true;
    this.rInput.disabled = true;
    this.sInput.disabled = true;
    this.startButton.textContent = 'Stop';
    this.startButton.onclick = this.stop.bind(this);
}

Chaos.prototype.makeVerticies = function () {
    this.verticies = [];
    var radius = Math.min(this.width, this.height) / 2 - 0.5;
    var angle = 2 * Math.PI / this.sides;
    var rot = -Math.PI / 2;
    for (var point = 0; point < this.sides; point++) {
        var x = radius * Math.cos(angle * point + rot) + radius;
        var y = radius * Math.sin(angle * point + rot) + radius;
        this.verticies.push(new Point(x, y));
    }
}

Chaos.prototype.plot = function (point) {
    this.ctx.fillRect(point.x, point.y, 1, 1);
}

Chaos.prototype.run = function () {
    var _this = this;

    this.times = parseInt(this.tInput.value, 10) || 10000;
    this.tInput.value = this.times;
    this.sides = parseInt(this.sInput.value, 10) || 1;
    this.sInput.value = this.sides;
    this.ratio = parseFloat(this.rInput.value) || 0;
    this.rInput.value = this.ratio;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.makeVerticies();
    this.verticies.forEach(function (vertex) {
        _this.plot(vertex);
    })

    var newPoint = new Point(
        Math.random() * this.width,
        Math.random() * this.height
    );
    this.plot(newPoint);

    for (var times = 0; times < this.times; times++) {
        var lastPoint = newPoint;
        var chaos = Math.floor(Math.random() * this.verticies.length);
        var vertex = this.verticies[chaos];
        var newPoint = lastPoint.midPoint(vertex, this.ratio);
        this.plot(newPoint);
    }

    this.req = requestAnimationFrame(function () {
        _this.ratio += .0005;
        if (_this.ratio > 2.0) {
            _this.sides++;
            _this.sInput.value = _this.sides;
            _this.ratio = 0;
        }
        _this.rInput.value = _this.ratio.toFixed(4);
        _this.run();
    })
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.midPoint = function (point, ratio) {
    var x = (point.x - this.x) * ratio + this.x;
    var y = (point.y - this.y) * ratio + this.y;
    return new Point(x, y);
}


