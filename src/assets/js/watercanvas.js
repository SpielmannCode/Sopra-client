// src: http://www.html5gamedevelopment.org/html5-game-tutorials/2012-01-procedural-textures-in-html5-canvas
// This is a port of Ken Perlin's Java code. The
// original Java code is at http://cs.nyu.edu/%7Eperlin/noise/.
// Note that in this version, a number from 0 to 1 is returned.
PerlinNoise = new function() {

  this.noise = function(x, y, z) {

    var p = new Array(512)
    var permutation = [151,160,137,91,90,15,
      131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
      190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
      88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
      77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
      102,143,54, 65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,
      135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,
      5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
      223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
      129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,
      251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,
      49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
      138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
    ];
    for (var i=0; i < 256 ; i++)
      p[256+i] = p[i] = permutation[i];

    var X = Math.floor(x) & 255,                  // FIND UNIT CUBE THAT
      Y = Math.floor(y) & 255,                  // CONTAINS POINT.
      Z = Math.floor(z) & 255;
    x -= Math.floor(x);                                // FIND RELATIVE X,Y,Z
    y -= Math.floor(y);                                // OF POINT IN CUBE.
    z -= Math.floor(z);
    var    u = fade(x),                                // COMPUTE FADE CURVES
      v = fade(y),                                // FOR EACH OF X,Y,Z.
      w = fade(z);
    var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,      // HASH COORDINATES OF
      B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      // THE 8 CUBE CORNERS,

    return scale(lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),  // AND ADD
      grad(p[BA  ], x-1, y  , z   )), // BLENDED
      lerp(u, grad(p[AB  ], x  , y-1, z   ),  // RESULTS
        grad(p[BB  ], x-1, y-1, z   ))),// FROM  8
      lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  // CORNERS
        grad(p[BA+1], x-1, y  , z-1 )), // OF CUBE
        lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
          grad(p[BB+1], x-1, y-1, z-1 )))));
  }
  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp( t, a, b) { return a + t * (b - a); }
  function grad(hash, x, y, z) {
    var h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
    var u = h<8 ? x : y,                 // INTO 12 GRADIENT DIRECTIONS.
      v = h<4 ? y : h==12||h==14 ? x : z;
    return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
  }
  function scale(n) { return (1 + n)/2; }
}


// Beispiel:
var canvas = document.getElementById("noiseCanvas");

var shader = function(r, g, b, a, x, y, w, h) {
  x /= w;
  y /= h; // normalize
  var size = 10;  // pick a scaling value
  var n = PerlinNoise.noise(size * x, size * y, 0.8);
  r = g = b = Math.round(255 * n);

  return {r:r, g:g, b:b, a:255};
};

var manipulateImageData = function(canvas, shader) {
  var w = canvas.width;
  var h = canvas.height;
  var context  = canvas.getContext("2d");

  var imageData = context.createImageData(w, h);

  for (var i = 0, l = imageData.data.length; i < l; i += 4) {
    var x = (i / 4) % w;
    var y = Math.floor(i / w / 4);

    var r = imageData.data[i + 0];
    var g = imageData.data[i + 1];
    var b = imageData.data[i + 2];
    var a = imageData.data[i + 3];

    var pixel = shader(r, g, b, a, x, y, w, h);

    imageData.data[i  ] = pixel.r;
    imageData.data[i + 1] = pixel.g;
    imageData.data[i + 2] = pixel.b;
    imageData.data[i + 3] = pixel.a;
  }

  context.putImageData(imageData, 0, 0);
};



function WaterCanvas(img) {
  var canvas = document.getElementById('water-background'),
    /** @type {CanvasRenderingContext2D} */
    ctx = canvas.getContext('2d'),
    width = 1366,
    height = 768,
    half_width = width >> 1,
    half_height = height >> 1,
    size = width * (height + 2) * 2,
    delay = 30,
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

  canvas.width = width;
  canvas.height = height;

  /*
   * Water ripple demo can work with any bitmap image
   * (see example here: http://media.chikuyonok.ru/ripple/)
   * But I need to draw simple artwork to bypass 1k limitation
   */

  // with (ctx) {
  //   fillStyle = '#fff';
  //   fillRect(0, 0, width, height);
  //
  //   fillStyle = '#0077bb';
  //   save();
  //   rotate(-0.785);
  //   for (var i = 0; i < count; i++) {
  //     fillRect(-width, i * step, width * 3, line_width);
  //   }
  //   restore();
  // }

  manipulateImageData(canvas, shader);

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
  }, 700);


}
