class Scrooth {
  constructor({element = window, strength=10, acceleration = 1.2,deceleration = 0.975}={}) {
    this.element = element;
    this.distance = strength;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.running = false;

    this.element.addEventListener('wheel', this.scrollHandler.bind(this), {passive: false});
    this.element.addEventListener('mousewheel', this.scrollHandler.bind(this), {passive: false});
    this.scroll = this.scroll.bind(this);
  }

  scrollHandler(e) {
    e.preventDefault();

    if (!this.running) {
      this.top = this.element.pageYOffset || this.element.scrollTop || 0;
      this.running = true;
      this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
      this.isDistanceAsc = true;
      this.scroll();
    } else {
      this.isDistanceAsc = false;
      this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
    }
  }

  scroll() {
    if (this.running) {
      this.currentDistance *= this.isDistanceAsc === true ? this.acceleration : this.deceleration;
      Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false ? this.running = false : 1;
      Math.abs(this.currentDistance) >= Math.abs(this.distance) ? this.isDistanceAsc = false : 1;

      this.top += this.currentDistance;
      this.element.scrollTo(0, this.top);
      
      requestAnimationFrame(this.scroll);
    }
  }
}

const scroll = new Scrooth({
  element: window,
  strength: 10,
  acceleration: 1.5,
  deceleration: 0.975,
});

// 한 페이지씩 스크롤 효과
// window.onload = function(){
//     const elm = document.querySelectorAll('.section');
//     const elmCount = elm.length;
//     elm.forEach(function(item, index){
//       item.addEventListener('mousewheel', function(event){
//         event.preventDefault();
//         let delta = 0;

//         if (!event) event = window.event;
//         if (event.wheelDelta) {
//             delta = event.wheelDelta / 120;
//             if (window.opera) delta = -delta;
//         } 
//         else if (event.detail)
//             delta = -event.detail / 3;

//         let moveTop = window.scrollY;
//         let elmSelector = elm[index];

//         // wheel down : move to next section
//         if (delta < 0){
//           if (elmSelector !== elmCount-1){
//             try{
//               moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
//             }catch(e){}
//           }
//         }
//         // wheel up : move to previous section
//         else{
//           if (elmSelector !== 0){
//             try{
//               moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
//             }catch(e){}
//           }
//         }

//         const body = document.querySelector('html');
//         window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
//       });
//     });
//   }