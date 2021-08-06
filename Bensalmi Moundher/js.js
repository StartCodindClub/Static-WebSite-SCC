

function scrollapright (){
    var rightelems = document.getElementsByClassName('rightelem');
    var rightelemspostop =[0,0,0] ;
    var rightelemsposbot =[0,0,0] ;

    var screenheight = window.innerHeight;

    for(i=0 ; i<rightelems.length ; i++){
        rightelemspostop[i] = rightelems[i].getBoundingClientRect().top;
        rightelemsposbot[i] = rightelems[i].getBoundingClientRect().bottom;
    }

  
    for(i=0 ; i<rightelems.length ; i++) {
        if(rightelemspostop[i] < screenheight/1.15){
            rightelems[i].classList.add('elemap');
    
        }
        else{
            rightelems[i].classList.remove('elemap')
        }
        
        if(rightelemsposbot[i] < 0){
            rightelems[i].classList.remove('elemap');
        }
    }

}


function scrollapleft (){
    var leftelems = document.getElementsByClassName('leftelem');
    var leftelemspostop =[0,0,0] ;
    var leftelemsposbot =[0,0,0] ;

    var screenheight = window.innerHeight;

    for(i=0 ; i<leftelems.length ; i++){
        leftelemspostop[i] = leftelems[i].getBoundingClientRect().top;
        leftelemsposbot[i] = leftelems[i].getBoundingClientRect().bottom;
    }

  
    for(i=0 ; i<leftelems.length ; i++) {
        if(leftelemspostop[i] < screenheight/1.15){
            leftelems[i].classList.add('elemap');
    
        }
        else{
            leftelems[i].classList.remove('elemap')
        }
        
        if(leftelemsposbot[i] < 0){
            leftelems[i].classList.remove('elemap');
        }
    }

    
}

window.addEventListener('scroll' , scrollapright);
window.addEventListener('scroll' , scrollapleft);








  var $cont = document.querySelector('.cont');
var $elsArr = [].slice.call(document.querySelectorAll('.el'));
var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));


$elsArr.forEach(function($el) {
  $el.addEventListener('click', function() {
    if (this.classList.contains('s--active')) return;
    $cont.classList.add('s--el-active');
    this.classList.add('s--active');
  });
});

$closeBtnsArr.forEach(function($btn) {
  $btn.addEventListener('click', function(e) {
    e.stopPropagation();
    $cont.classList.remove('s--el-active');
    document.querySelector('.el.s--active').classList.remove('s--active');
  });
});

function gg() {
  var slid = document.getElementById('slide');
  var screenheight = window.innerHeight;

  console.log(slid);
  var slidpostop = slid.getBoundingClientRect().top;
  var slidposbot = slid.getBoundingClientRect().bottom;
  if(slidpostop < screenheight/1.3){
      $cont.classList.remove('s--inactive');

  }
  else{
      $cont.classList.add('s--inactive');
  }

  if(slidposbot < 150){
      $cont.classList.add('s--inactive');
  }
	console.log(slidposbot);
}
window.addEventListener('scroll' , gg);


var form = document.getElementById("contactform");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Thank you!";
    form.reset()
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem"
  });
}
form.addEventListener("submit", handleSubmit);




document.querySelectorAll('a[href^="#first"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('a[href^="#mainup"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('a[href^="#slide"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('a[href^="#contactus"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('a[href^="#contactusup"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('a[href^="#footer"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// slidemob

var slideimgs = ["imgs/pic1.jpg" , "imgs/pic2.jpg" , "imgs/pic3.jpg", "imgs/pic4.jpg" , "imgs/pic5.jpg"]  ;
var i=0;

function slidemob (){
    
    if( i < slideimgs.length-1){
        i++ ;
    }
    else{
        i=0 ;
    }
    console.log(i);
    document.getElementById("slidemob").src =  slideimgs[i]  ;
    setTimeout ("slidemob ()" , 2000);
}
slidemob ();