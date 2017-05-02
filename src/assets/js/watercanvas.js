function WaterCanvas(img) {
  var canvas = document.createElement('canvas');

  canvas.width = 1360;
  canvas.height = 760;

  var gl = initWebGL(canvas);

  // Es geht nur weiter, wenn WebGl verfügbar ist.

  if (gl) {
    img.parentNode.insertBefore(canvas, img);


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
      '  gl_FragColor = vec4(vec3(c * c * c * c), 0.0) + vec4(0.0, 0.4, 0.55, 1.0);\n' +
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
