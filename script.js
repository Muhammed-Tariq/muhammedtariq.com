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

/* Lightbox: click-to-zoom for images with class .yir-image or [data-zoomable="true"] */
(() => {
  const zoomables = document.querySelectorAll('.yir-image, [data-zoomable="true"]');
  if (!zoomables.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">×</button>
    <div class="lightbox-stage">
      <img class="lightbox-img" alt="">
    </div>
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const stage = overlay.querySelector('.lightbox-stage');

  let isOpen = false;
  let isActual = false;

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('open');
    overlay.classList.remove('actual');
    document.documentElement.classList.add('no-scroll');
    isOpen = true;
    isActual = false;
  }

  function closeLightbox() {
    overlay.classList.remove('open', 'actual');
    document.documentElement.classList.remove('no-scroll');
    img.src = '';
    isOpen = false;
    isActual = false;
  }

  function toggleActual() {
    isActual = !isActual;
    overlay.classList.toggle('actual', isActual);
    // keep scroll position sane when toggling
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
  }

  zoomables.forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      openLightbox(el.currentSrc || el.src, el.alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox(); // click backdrop to close
  });

  stage.addEventListener('dblclick', (e) => {
    e.preventDefault();
    toggleActual(); // double-click toggles fit <-> 1:1
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'Enter') toggleActual();
  });
})();
