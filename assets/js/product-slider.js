let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthDots = dots.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthDots ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthDots;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    //
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);


}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

// Funcionalidad de deslizamiento táctil
let startX;

slider.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', function(e) {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        active = active + 1 <= lengthDots ? active + 1 : 0;
    } else if (startX < endX - 50) {
        active = active - 1 >= 0 ? active - 1 : lengthDots;
    }
    reloadSlider();
});
