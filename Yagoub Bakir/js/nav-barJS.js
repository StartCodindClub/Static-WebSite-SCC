var targetElement = document.querySelector(".logo");

let menuToggler = document.querySelector('.menu-toggle');
let body = document.querySelector('body');

menuToggler.addEventListener('click',function(){
  body.classList.toggle('open');
});

function DoAnimation() {
  
  
  targetElement.style.animation = 'none';
  
  setTimeout(function() {
    targetElement.style.opacity = '1';
    targetElement.style.animation = '';
    targetElement.style.animationDelay = '0.1s';
    
  }, 10);
  
}