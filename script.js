/* Clicking */
const links = document.querySelectorAll('.nav-link');
links.forEach(link=>{
  link.addEventListener('click', e=>{
    document.querySelector('.nav-link.active')?.classList.remove('active');
    e.currentTarget.classList.add('active');
  });
});


/* Scrolling */
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        links.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href').slice(1) === id)
        );
      }
    });
  },
  {
    rootMargin: "-40% 0px -70% 0px"
  }
);

sections.forEach(sec => observer.observe(sec));