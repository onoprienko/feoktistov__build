// rellax
var rellax
const rellaxStart = ()=>{
	rellax = new Rellax('.rellax',{
    	speed: 1.3,
    	center: false,
	});
}
rellaxStart()

var rellaxCenter
const rellaxStartCenter = ()=>{
	rellaxCenter = new Rellax('.rellax-center',{
    	speed: 1.3,
    	center: true,
	});
}
rellaxStartCenter()

const rellaxResize = ()=>{
	if(window.innerWidth<=992){
	  	rellax.options ? rellax.destroy() : null
	  	rellaxCenter.options ? rellaxCenter.destroy() : null
	}else{
	  	rellax.options ? rellax.refresh() : null
	  	rellaxCenter.options ? rellaxCenter.refresh() : null
	}	
}
rellaxResize()



//AOS
// AOS.init({
//     offset: 200,
//     duration: 1000,
//     easing: 'ease-out',
//     delay: 100,
//   });



//B-lazy
// var bLazy = new Blazy({
// 	loadInvisible: true,
// 	offset: 200
// });



//mediumZoom
const zoom = mediumZoom('[data-zoomable]',{
	margin: 0,
	background: "rgba(255,255,255,1)"
})

zoom.on('close', (e) => {
	let opened = document.querySelectorAll(".medium-zoom-image--opened")
	for(let opened_el of opened){
		opened_el.classList.add("hide")
	}
	let hidden = document.querySelectorAll(".medium-zoom-image--hidden")
	for(let hidden_el of hidden){
		hidden.classList.remove("medium-zoom-image--hidden")
	}
}) 



//info-trigger

let infoTrigger = document.querySelector('.info-trigger')
infoTrigger ? infoTrigger.addEventListener("click", (e)=>{
	e.preventDefault()
	infoTrigger.classList.toggle("open")
	setTimeout(()=>{
   		//AOS.refresh();
    	onResize ? onResize() : null	
	},300)
}) : null;
	




//popper

let popperTrigger = document.querySelectorAll('.popper-trigger')

for(let element of popperTrigger){

		element ? element.addEventListener("click", (e)=>{
			e.preventDefault()
			element.classList.toggle("open")
		}) : null;
	}


//gsap smooth page scroll



	var html = document.documentElement;
	var body = document.body;
	var scroller = {
	  target: document.querySelector("#scroll-container"),
	  ease: 0.04, // <= scroll speed
	  endY: 0,
	  y: 0,
	  resizeRequest: 1,
	  scrollRequest: 0,
	};
	var requestId = null;
	// TweenLite.set(scroller.target, {
	//   rotation: 0.01,
	//   force3D: true
	// });
	window.addEventListener("load", onLoad);
	function onLoad() {    
	  updateScroller();  
	  window.focus();
	  window.addEventListener("resize", onResize);
	  document.addEventListener("scroll", onScroll); 
	}
	function updateScroller() {


		  var resized = scroller.resizeRequest > 0;
		  if (resized) {    
		    var height = scroller.target.clientHeight;
		    body.style.height = height + "px";
		    scroller.resizeRequest = 0;
		  }
		  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
		  scroller.endY = scrollY;
		  scroller.y += (scrollY - scroller.y) * scroller.ease;
		  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
		    scroller.y = scrollY;
		    scroller.scrollRequest = 0;
		  }
		  TweenLite.set(scroller.target, { 
		    y: -scroller.y 
		  });
		  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;



	}
	function onScroll() {
		if(window.innerWidth>=992){
		  scroller.scrollRequest++;
		  if (!requestId) {
		    requestId = requestAnimationFrame(updateScroller);
		  }
		}
	}
	function onResize() {
		if(window.innerWidth>=992){
		  scroller.resizeRequest++;
		  if (!requestId) {
		    requestId = requestAnimationFrame(updateScroller);
		  }

		}
	  rellaxResize()

	}






//projects filter
(function(){
	const sortFilter = ()=>{
		let projectItems = document.querySelectorAll('.section-projects .project-item');
		let sort = [...projectItems].sort((a,b)=>{
			if(a.classList.contains("displaynone")){
				return 1
			}
			return -1
		})
		for (let i = 0; i < sort.length; i++) {
			sort[i].classList.remove("rellax")
			if (i%2 != 0){
				sort[i].classList.add("rellax")
			}
			document.querySelector('.projects-holder').append(sort[i])
		}
	}

	const projectFilter = (filter)=>{
		let projectItems = document.querySelectorAll('.section-projects .project-item');
		for(let element of projectItems){
			if(element.getAttribute("data-tag").split(" ").find((item)=>item===filter)){
				element.classList.remove("displaynone")
			}else{
				element.classList.add("displaynone")
			}
		}
		sortFilter()	

		setTimeout(()=>{
			
       		//AOS.refresh();
       		rellax.destroy();
       		rellaxStart()
        	onResize ? onResize() : null	
		},100)

	}

	let filterElements = document.querySelectorAll('.projects-filter nav a');
	for(let element of filterElements){
		element.addEventListener("click", (e)=>{
			e.preventDefault()
			//bLazy.load(document.querySelectorAll('.section-projects .project-item img'))
			for(let element of filterElements){
				element.classList.remove("active")
			}
			element.classList.add("active")
			projectFilter(element.getAttribute("data-filter"))
		});
	}
})()




//main-nav-mobile

document.querySelector('.main-nav-trigger').addEventListener("click", (e)=>{
	e.preventDefault()
	document.querySelector('.header-main').classList.toggle("opened")
})