function WaterCanvas(img) {
  var canvas = document.createElement('canvas'); //webgl water
  var canvas2 = document.createElement('canvas'), //JS ripples
    ctx = canvas2.getContext('2d'),
    width = 1360,
    height = 760,
    half_width = width >> 1,
    half_height = height >> 1,
    size = width * (height + 2) * 2,
    delay = 50,
    oldind = width,
    newind = width * (height + 3),
    riprad = 3,
    ripplemap = [],
    last_map = [],
    ripple,
    texture,
    line_width = 20,
    step = line_width * 2,
    count = height / line_width;

  canvas.width = 1360;
  canvas.height = 760;

  canvas2.width = 1360;
  canvas2.height = 760;

  var gl = initWebGL(canvas);

  // Es geht nur weiter, wenn WebGl verfügbar ist.

  if (gl) {

    ctx.fillStyle = ctx.createPattern(img, 'repeat');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    img.parentNode.insertBefore(canvas, img);
    img.parentNode.insertBefore(canvas2, img);

    texture = ctx.getImageData(0, 0, width, height);
    ripple = ctx.getImageData(0, 0, width, height);

    for (var i = 0; i < size; i++) {
      last_map[i] = ripplemap[i] = 0;
    }

    /**
     * Main loop
     */
    function run() {
      newframe();
      ctx.putImageData(ripple, 0, 0);
    }

    /**
     * Disturb water at specified point
     */
    function disturb(dx, dy) {
      dx <<= 0;
      dy <<= 0;

      for (var j = dy - riprad; j < dy + riprad; j++) {
        for (var k = dx - riprad; k < dx + riprad; k++) {
          ripplemap[oldind + (j * width) + k] += 128;
        }
      }
    }

    /**
     * Generates new ripples
     */
    function newframe() {
      var a, b, data, cur_pixel, new_pixel, old_data;

      var t = oldind; oldind = newind; newind = t;
      var i = 0;

      // create local copies of variables to decrease
      // scope lookup time in Firefox
      var _width = width,
        _height = height,
        _ripplemap = ripplemap,
        _last_map = last_map,
        _rd = ripple.data,
        _td = texture.data,
        _half_width = half_width,
        _half_height = half_height;

      for (var y = 0; y < _height; y++) {
        for (var x = 0; x < _width; x++) {
          var _newind = newind + i, _mapind = oldind + i;
          data = (
            _ripplemap[_mapind - _width] +
            _ripplemap[_mapind + _width] +
            _ripplemap[_mapind - 1] +
            _ripplemap[_mapind + 1]) >> 1;

          data -= _ripplemap[_newind];
          data -= data >> 5;

          _ripplemap[_newind] = data;

          //where data=0 then still, where data>0 then wave
          data = 1024 - data;

          old_data = _last_map[i];
          _last_map[i] = data;

          if (old_data != data) {
            //offsets
            a = (((x - _half_width) * data / 1024) << 0) + _half_width;
            b = (((y - _half_height) * data / 1024) << 0) + _half_height;

            //bounds check
            if (a >= _width) a = _width - 1;
            if (a < 0) a = 0;
            if (b >= _height) b = _height - 1;
            if (b < 0) b = 0;

            new_pixel = (a + (b * _width)) * 4;
            cur_pixel = i * 4;

            _rd[cur_pixel] = _td[new_pixel];
            _rd[cur_pixel + 1] = _td[new_pixel + 1];
            _rd[cur_pixel + 2] = _td[new_pixel + 2];
          }

          ++i;
        }
      }
    }

    canvas.onmousemove = function(/* Event */ evt) {
      disturb(evt.offsetX || evt.layerX, evt.offsetY || evt.layerY);
    };

    setInterval(run, delay);

    // generate random ripples
    var rnd = Math.random;
    setInterval(function() {
      disturb(rnd() * width, rnd() * height);
    }, 1500);

    //webgl

    canvas.setAttribute("style", "position: absolute; top: 0; left: 0;");





    gl.clearColor(0.0, 0.0, 0.0, 1.0);                // Setzt die Farbe auf Schwarz, vollständig sichtbar
    gl.enable(gl.DEPTH_TEST);                         // Aktiviere Tiefentest
    gl.depthFunc(gl.LEQUAL);                          // Nähere Objekte verdecken entferntere Objekte
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT) // Lösche alles, um die neue Farbe sichtbar zu machen

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
        1.0, -1.0,
        1.0,  1.0]),
      gl.STATIC_DRAW
    );

    var vertexShaderSource =
      'attribute vec2 a_position;\n' +
      'varying vec2 v_pos;\n' +
      'void main() {\n' +
      '  gl_Position = vec4(a_position,0,1);\n' +
      '  v_pos = a_position;\n' +
      '}\n';

    //Use the createShader function from the example above
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    var fragmentShaderSource =
      'precision mediump float;\n' +
      'varying vec2 v_pos;\n' +
      'uniform float u_time;\n' +
      '#define MAX_ITER 10 // water depth\n' +
      'void main() {\n' +
      '  vec2 sp = v_pos;\n' +
      '  vec2 p = sp * 15.0 - vec2(20.0);\n' +
      '  vec2 i = p;\n' +
      '  float c = 0.0; // brightness; larger -> darker\n' +
      '  float inten = 0.025; // brightness; larger -> brighter\n' +
      '  float speed = 1.5; // larger -> slower\n' +
      '  float speed2 = 3.0; // larger -> slower\n' +
      '  float freq = 0.8; // ripples\n' +
      '  float xflow = 0.0; // flow speed in x direction\n' +
      '  float yflow = 0.5; // flow speed in y direction\n' +
      '  for (int n = 0; n < MAX_ITER; n++) {\n' +
      '     float t = u_time * (1.0 - (3.0 / (float(n) + speed)));\n' +
      '     i = p + vec2(cos(t - i.x * freq) + sin(t + i.y * freq) + (u_time * xflow), sin(t - i.y * freq) + cos(t + i.x * freq) + (u_time * yflow));\n' +
      '     c += 1.0 / length(vec2(p.x / (sin(i.x + t * speed2) / inten), p.y / (cos(i.y + t * speed2) / inten)));\n' +
      '  }\n' +
      '  c /= float(MAX_ITER);\n' +
      '  c = 1.5 - sqrt(c);\n' +
      '  gl_FragColor = vec4(vec3(c * c * c * c), 0.0) + vec4(0.0, 0.4, 0.55, 0.65);\n' +
      // '  gl_FragColor = vec4(0,0,0,0);\n' +
      '}\n';

    //Use the createShader function from the example above
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();

    // Attach pre-existing shaders
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
      var info = gl.getProgramInfoLog(program);
      throw 'Could not compile WebGL program. \n\n' + info;
    }

    gl.useProgram(program);
    var time = 0.0;

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    var attributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);

    render();
  }


  function render() {

    window.requestAnimationFrame(render, canvas);

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    var attributeTime = gl.getUniformLocation(program, "u_time");
    gl.uniform1f(attributeTime, time+= 0.005);

    gl.drawArrays(gl.TRIANGLES, 0, 6);


  }

  function initWebGL() {
    gl = null;

    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch (e) {
    }

    // Wenn wir keinen WebGl Kontext haben

    if (!gl) {
      alert("WebGL konnte nicht initialisiert werden.");
      gl = null;
    }

    return gl;
  }

}
