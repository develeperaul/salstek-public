import 'glightbox/dist/css/glightbox.css';
import GLightbox from 'glightbox';
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = GLightbox({
    touchNavigation: false,
    keyboardNavigation: false,
    height: 'auto',
    loop: true,
    autoplayVideos: true,
  });

  const customLightboxHTML = `<div id="glightbox-body" class="glightbox-container">
    <div class="gloader visible"></div>
    <div class="goverlay"></div>
    <div class="gcontainer">
    <div id="glightbox-slider" class="gslider">
    
    </div>
    <button class="gnext gbtn gswiper-next" tabindex="0" aria-label="Next" data-customattribute="example"></button>
    <button class="gprev gbtn gswiper-prev" tabindex="1" aria-label="Previous"></button>
    <button class="gclose gbtn" tabindex="2" aria-label="Close"></button>

</div>
</div>`;

  let customSlideHTML = `<div class="gslide">
    <div class="gslide-inner-content">
        <div class="ginner-container">
            <div class="gslide-media">
            </div>
            
        </div>
    </div>
</div>`;

  const lightboxPlay = GLightbox({
    selector: '.gl-play',
    // lightboxHTML: customLightboxHTML,
    // slideHTML: customSlideHTML,
    touchNavigation: false,
    keyboardNavigation: false,
    height: 'auto',
    loop: true,
    autoplayVideos: true,
  });
  const lightboxPhoto = GLightbox({
    selector: '.gl-photo',
    // lightboxHTML: customLightboxHTML,
    // slideHTML: customSlideHTML,
    touchNavigation: false,
    keyboardNavigation: false,
    height: 'auto',
    loop: true,
    autoplayVideos: true,
  });
});
