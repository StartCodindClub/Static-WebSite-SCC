

var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 300; 
var imgHeight = 200;






setTimeout(init, 100);

var obox = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];


ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";


var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";





const todaysQuote = document.querySelector(".todaysWisdome");

var randomQuote=new Array(); 

    randomQuote[0]='Talk is cheap show me the code'; 
    randomQuote[1]='Any fool can write code that a computer can understand. Good programmers write code that humans can understand'; 
    randomQuote[2]='First, solve the problem. Then, write the code'; 
    randomQuote[3]='Experience is the name everyone gives to their mistakes'; 
    randomQuote[4]='In order to be irreplaceable, one must always be different';
    randomQuote[5]='Java is to JavaScript what car is to Carpet'; 
    randomQuote[6]='Knowledge is power';
    randomQuote[7]='Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code'; 
    randomQuote[8]='Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away';
    randomQuote[9]='Ruby is rubbish! PHP is phpantastic!'; 
    randomQuote[10]='Code is like humor. When you have to explain it, it’s bad';
    randomQuote[11]='Fix the cause, not the symptom'; 
    randomQuote[12]='Optimism is an occupational hazard of programming: feedback is the treatment';
    randomQuote[13]='When to use iterative development? You should use iterative development only on projects that you want to succeed'; 
    randomQuote[14]='Simplicity is the soul of efficiency';
    randomQuote[15]='Before software can be reusable it first has to be usable'; 
    randomQuote[16]='Make it work, make it right, make it fast';
var id=Math.round(Math.random()*(randomQuote.length-1)); 
todaysQuote.innerHTML = randomQuote[id];




function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {

  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;


if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}




document.onpointerdown = function (e) {
  clearInterval(obox.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(obox);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    obox.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(obox);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(obox.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};


//Scroll reveal
window.sr = ScrollReveal();
sr.reveal('.animate-left', {
  origin: 'left',
  duration: 500,
  distance: '15rem'
});

sr.reveal('.animate-right', {
  origin: 'right',
  duration: 500,
  distance: '15rem'
});

sr.reveal('.animate-up', {
  origin: 'top',
  duration: 500,
  distance: '25rem'
});

sr.reveal('.animate-bottom', {
  origin: 'bottom',
  duration: 500,
  distance: '25px'
});