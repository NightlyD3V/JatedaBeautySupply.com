// javascript:(function(d){var w=d.documentElement.offsetWidth,t=d.createTreeWalker(d.body,NodeFilter.SHOW_ELEMENT),b;while(t.nextNode()){b=t.currentNode.getBoundingClientRect();if(b.right>w||b.left<0){t.currentNode.style.setProperty('outline','1px dotted red','important');console.log(t.currentNode);}};}(document));
const hamburger = document.getElementById("hamburger")
const mobile_nav = document.getElementById("mobile_nav")
let open_hamburber = false;
hamburger.addEventListener("mouseup", (e) => {
    let hamburger_show = anime({
        targets: [mobile_nav],
        translateY: ['-100','0'],
        opacity: ['0','1'],
        autoplay: false,
        easing: 'easeInOutSine',
        duration: 500,
        begin: function() {
            mobile_nav.style.visibility = "visible"
        }
        
    })
    let hamburger_hide = anime({
        targets: [mobile_nav],
        translateY: ['0','-100'],
        opacity: ['1','0'],
        easing: 'easeInOutSine',
        autoplay: false,
        duration: 1000,
    })
    open_hamburber = !open_hamburber 
    open_hamburber ? hamburger_show.play() : hamburger_hide.play()
});
AOS.init();