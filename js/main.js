var canvas = document.querySelector('#engines'),
  ctx = canvas.getContext('2d');
var trailCanvas = document.querySelector("#trails"),
  trailCtx = trailCanvas.getContext('2d');
//音乐
audio.addEventListener("canplaythrough", function ({

  //音频可流畅播放时，播放；PC上可以，移动端不行。
  audio.play();
document.addEventListener('touchstart', function () {

  //增加一个touchstart交互事件，触屏后播放音乐
  audio.play();
  //播放音频后移除touchstart事件的当前匿名函数
  document.removeEventListener('touchstart', arguments.callee, false);
}, false);

});
function animLoop(render) {
  var running, lastFrame = +new Date;
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  function loop(now) {
    if (running !== false) {
      requestAnimFrame(loop);
      running = render(now - lastFrame);
      lastFrame = now;
    }
  }
  loop(lastFrame);
};

function drawDot(x, y, color, ctx) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

var getTrailColor = (function() {
  var blue = 200,
    dir = -1;
  return function() {
    blue += dir;
    if (blue === 100) {
      dir = 1;
    } else if (blue === 200) {
      dir = -1;
    }
    return 'rgba(255,105,' + blue + ',.5)';
  };
})();

// 5 petals flower
var engines = [
  {x: 250, y: 75, r: 60, a: 3 * Math.PI / 4, s: Math.PI / 200},
  {x: 350, y: 300, r: 100, a: -Math.PI / 4, s: -Math.PI / 50}
];

// 8 petals
/*var engines = [
  {x: 300, y: 300, r: 200, a: Math.PI / 4, s: Math.PI / 50},
  {x: 300, y: 300, r: 200, a: -Math.PI / 4, s: -Math.PI / 30}
];*/

// 4 circles
/*var engines = [
  {x: 150, y: 300, r: 150, a: Math.PI, s: Math.PI / 100},
  {x: 300, y: 150, r: 150, a: -Math.PI/2, s: Math.PI / 100},
  {x: 450, y: 300, r: 150, a: 2*Math.PI, s: Math.PI / 100},
  {x: 300, y: 450, r: 150, a: Math.PI/2, s: Math.PI / 100}
];*/

// rosace
/*var engines = [];
for (var i = 0; i < 2 * Math.PI; i += Math.PI / 16) {
  engines.push({
    x: 300 + (150 * Math.cos(i)),
    y: 300 + (150 * Math.sin(i)),
    r: 100,
    a: i,
    s: Math.PI / 100
  });
}*/

animLoop(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var linksCoordinates = [];

  // Engines
  ctx.strokeStyle = 'rgba(255,255,255,.5)';
  ctx.lineWidth = 2;
  engines.forEach(function(engine) {
    var posX = engine.x + (engine.r * Math.cos(engine.a)),
      posY = engine.y + (engine.r * Math.sin(engine.a));

    ctx.beginPath();
    ctx.moveTo(engine.x, engine.y);
    ctx.lineTo(posX, posY);
    ctx.closePath();
    ctx.stroke();

    drawDot(engine.x, engine.y, 'rgba(255,255,255,.5)', ctx);
    drawDot(posX, posY, 'rgba(255,255,255,.5)', ctx);

    engine.a += engine.s;

    linksCoordinates.push({
      x: posX,
      y: posY
    });
  });

  // Links
  ctx.strokeStyle = 'rgba(255,105,180,.5)';
  ctx.beginPath();
  ctx.moveTo(linksCoordinates[0].x, linksCoordinates[0].y);
  linksCoordinates.forEach(function(point, index) {
    if (index !== 0) {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.closePath();
  ctx.stroke();

  // Links mid-points
  linksCoordinates.forEach(function(point, index, points) {
    var start = point,
      end = points[index + 1] || points[0];
    var midX = (start.x + end.x) / 2,
      midY = (start.y + end.y) / 2;
    drawDot(midX, midY, 'red', ctx);
    drawDot(midX, midY, getTrailColor(), trailCtx);
  });
});

/* 弹幕 */
window.onload = function (argument) {

    // var lyric = "i couldn't take it couldn't stand another minute couldn't bear another day without you in it";
    var lyric = "狗儿我爱你 狗儿我爱你 生日快乐 狗儿我爱你 生日快乐 狗儿我爱你 狗儿我爱你 生日快乐 狗儿我爱你";
    var words = {};
    var words_attr = [];
    string_handle(lyric);

    var canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.getContext) {
        var c = canvas.getContext('2d'),
            w = canvas.width,
            h = canvas.height;

        c.strokeStyle = 'red';
        c.fillStyle = 'white';
        c.lineWidth = 5;

        // constructor
        Word = function (key) {
            this.text = key;
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.font = words[key] * 10 + 'px arial'
            this.speed = (words[key]);
        }
        for (key in words) {
            words_attr.push(new Word(key));
        }
        console.log(words_attr.length);

        function animation() {
            for (var i = 0; i < words_attr.length; i++) {
                c.font = words_attr[i].font;
                c.fillText(words_attr[i].text, words_attr[i].x, words_attr[i].y);
                words_attr[i].width = c.measureText(words_attr[i].text).width;
                c.stroke();
            }
            move();
        }

        function move() {
            for (var i = 0; i < words_attr.length; i++) {
                if (words_attr[i].x > w) {
                    words_attr[i].x = -words_attr[i].width;
                    words_attr[i].y = Math.random() * h;
                } else {
                    words_attr[i].x += words_attr[i].speed;
                }
            }
        }

        setInterval(function () {
            c.clearRect(0, 0, w, h);
            animation();
        }, 80);

    }

    function string_handle(str) {
        var split_str = str.split(" ");
        var word_array = [];
        var word_count = [];
        for (var i = 0; i < split_str.length; i++) {
            check = true;
            for (var j = 0; j <= word_array.length; j++) {
                if (split_str[i] == word_array[j]) {
                    word_count[j]++;
                    check = false;
                    break;
                }
            }
            if (check) {
                word_array.push(split_str[i]);
                word_count.push(1);
            }
        }
        for (var i = 0; i < word_array.length; i++) {
            words[word_array[i]] = word_count[i];
        }
        return words;
    }

}