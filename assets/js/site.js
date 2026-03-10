const menuButtons = document.querySelectorAll('.menu-toggle');

menuButtons.forEach((button) => {
  const nav = document.getElementById(button.getAttribute('aria-controls'));
  if (!nav) return;

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });
});

const tabGroups = document.querySelectorAll('.tabs');

tabGroups.forEach((group) => {
  const buttons = group.querySelectorAll('.tab-btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const container = group.parentElement;
      if (!targetId || !container) return;

      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });

      const panels = container.querySelectorAll('.tab-panel');
      panels.forEach((panel) => {
        const active = panel.id === targetId;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    });
  });
});

if (window.hljs) {
  window.hljs.highlightAll();
}


const zoomableImages = document.querySelectorAll('.gif-card img');

if (zoomableImages.length) {
  const overlay = document.createElement('div');
  overlay.className = 'image-lightbox';
  overlay.hidden = true;
  overlay.innerHTML = '<button class="lightbox-close" type="button" aria-label="Закрыть">×</button><img class="lightbox-image" alt="">';
  document.body.appendChild(overlay);

  const overlayImage = overlay.querySelector('.lightbox-image');
  overlayImage.setAttribute('draggable', 'false');
  overlayImage.setAttribute('translate', 'no');
  const closeBtn = overlay.querySelector('.lightbox-close');

    const suppressNativePopups = (node) => {
    ['dragstart', 'selectstart', 'contextmenu'].forEach((evt) => {
      node.addEventListener(evt, (event) => event.preventDefault());
    });
  };

  suppressNativePopups(overlayImage);
  const closeLightbox = () => {
    overlay.hidden = true;
    document.body.style.overflow = '';
    overlayImage.src = '';
  };

  zoomableImages.forEach((img) => {
    img.classList.add('is-zoomable');
    img.setAttribute('draggable', 'false');
    img.setAttribute('translate', 'no');
    suppressNativePopups(img);
    img.addEventListener('click', () => {
      overlayImage.src = img.currentSrc || img.src;
      overlayImage.alt = img.alt || '';
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) closeLightbox();
  });
}



const allImagesNoPopup = document.querySelectorAll('img');

allImagesNoPopup.forEach((img) => {
  img.setAttribute('draggable', 'false');
  img.setAttribute('translate', 'no');

  ['dragstart', 'selectstart', 'contextmenu'].forEach((evt) => {
    img.addEventListener(evt, (event) => event.preventDefault());
  });
});
