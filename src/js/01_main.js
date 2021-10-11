const headerBg = document.querySelector('.header__media-nav__bg')
const tabLinks = document.getElementsByClassName('tariffs__tab');
document.querySelector('.header__media-menu__btn').onclick = function() {
    document.querySelector('.header__media-menu__btn').classList.toggle('open');
    document.querySelector('.header__media-nav').classList.toggle('open');
    headerBg.classList.toggle('active');
}
headerBg.onclick = function() {
    this.classList.remove('active')
    document.querySelector('.header__media-menu__btn').classList.remove('open');
    document.querySelector('.header__media-nav').classList.remove('open');
}
tabLinks[0].onclick = function() {
    tabLinks[1].classList.remove('active-btn')
    tabLinks[0].classList.add('active-btn')
}
tabLinks[1].onclick = function() {
        tabLinks[0].classList.remove('active-btn')
        tabLinks[1].classList.add('active-btn')
    }
    // counter
const elements = [
    a = document.querySelector('.count1'),
    b = document.querySelector('.count2'),
    c = document.querySelector('.count3'),
    d = document.querySelector('.count4'),
    f = document.querySelector('.count5'),
]
const time = 2500;
const step = 1;

function outNum(num, elem) {
    let e = elements[0];
    n = 0;
    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        if (n == num) {
            clearInterval(interval);
        }
        e.innerHTML = n;
    }, t);
}

outNum(260, elements[0]);


//fixed header


window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    let scrollPos = 150;
    let mediaScrollPos = 50;
    let menu = document.querySelector('.header__nav')
    let header = document.getElementById('header')
    let phoneNumber = document.querySelector('.header__phone-link')

    if (document.body.scrollTop > scrollPos || document.documentElement.scrollTop > scrollPos) {
        header.classList.add('fixed');
        menu.classList.add('resize');
        phoneNumber.classList.add('resize');
    } else {
        header.classList.remove('fixed');
        menu.classList.remove('resize');
        phoneNumber.classList.remove('resize');
    };
    if (document.body.scrollTop > mediaScrollPos || document.documentElement.scrollTop > mediaScrollPos) {
        header.classList.add('bgwhite');
    } else {
        header.classList.remove('bgwhite');
    }
}


//animation

const animItems = document.querySelectorAll('.anim_item');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 100;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_no_hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }


    setTimeout(() => {
        animOnScroll();
    }, 0);
}