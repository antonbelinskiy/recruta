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
const yearPrice = document.querySelectorAll('.year-p')
const monthPrice = document.querySelectorAll('.month-p')
tabLinks[0].onclick = function() {
    tabLinks[1].classList.remove('active-btn')
    tabLinks[0].classList.add('active-btn')
}
tabLinks[1].onclick = function() {
        tabLinks[0].classList.remove('active-btn')
        tabLinks[1].classList.add('active-btn')
    }
    // counter

const time = 2500;
const counters = document.querySelectorAll('.count')


function outNum(num, elem, steps) {

    let e = document.querySelector('#' + elem);
    let n = 0;
    let t = Math.round(time / (num / steps));
    let interval = setInterval(() => {
        n = n + steps;
        if (n == num) {
            clearInterval(interval);
        }
        e.innerHTML = n;
    }, t);
}

outNum(260, 'counter1', 1);
outNum(260, 'counter2', 1);
//fixed header




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


    setInterval(() => {
        animOnScroll();
    }, 500);
}

//scroll to top 


window.onload = () => {
    const anchor = document.querySelector('.scroll-to-top')

    anchor.addEventListener('click', function(e) {

        window.scrollTo({ top: 0, behavior: 'smooth' });

    })

    window.onscroll = () => {
        if (window.scrollY > 800) {
            anchor.classList.remove('hide')
        } else if (window.scrollY < 800) {
            anchor.classList.add('hide')
        }
        scrollFunction();
    }
}
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName)
            popupOpen(currentPopup)
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.popup__close')
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i]
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodylock();
        }
        currentPopup.classList.add('open')
        currentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup__inner')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open')
        if (doUnlock) {
            bodyUnlock()
        }
    }
}

function bodylock() {
    const l = window.innerWidth - document.querySelector('body').offsetWidth + 'px'
    if (lockPadding.length < 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i]
            el.style.paddingRight = l;
        }
    }
    body.style.paddingRight = l;
    body.classList.add('lock')

    unlock = false
    setTimeout(function() {
        unlock = true
    }, timeout)
}

function bodyUnlock() {
    setTimeout(function() {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i]
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout)
    unlock = false
    setTimeout(function() {
        unlock = true
    }, timeout)
}

document.addEventListener('keydown', function(e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open')
        popupClose(popupActive)
    }
})



(function() {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function() {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();