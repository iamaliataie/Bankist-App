'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const sections = document.querySelectorAll('.section')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => button.addEventListener('click', openModal))

for (let i = 0; i < btnsOpenModal.length; i++)

btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnLearnMore.addEventListener('click', ()=>{
  section1.scrollIntoView({behavior: 'smooth'})
})

document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link--btn')){
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({behavior: 'smooth'});
  }
})


tabsContainer.addEventListener('click', (e)=>{
  // Get clicked tab element
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classess
  tabs.forEach(tab=>tab.classList.remove('operations__tab--active'))
  tabsContent.forEach(tab=>tab.classList.remove('operations__content--active'))
  
  // Activate tab
  clicked.classList.add('operations__tab--active');
  
  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

const handleNavbarMouse = function(e){
  if (e.target.classList.contains('nav__link')){
    const activeLink = e.target;
    const siblings = activeLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = activeLink.closest('.nav').querySelector('img');
    siblings.forEach(link => {
      if (link !== activeLink){
        link.style.opacity = this;
      }
    })
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleNavbarMouse.bind(0.5))
nav.addEventListener('mouseout', handleNavbarMouse.bind(1))

const headerCallback = (entries)=>{
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky')
    else nav.classList.add('sticky')
}

const headerObserver = new IntersectionObserver(headerCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`
})
headerObserver.observe(header)

const sectionsCallback = (entries, observer)=>{
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionsObserver = new IntersectionObserver(sectionsCallback, {
  root: null,
  threshold: 0.20
})
sections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
})