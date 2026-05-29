// boxify.js – automatically wrap heading + paragraph pairs in a styled .content-box
// This script runs after the DOM is ready and adds a background image (default: images/sir.png)
(function() {
  const defaultImg = 'images/sir.png'; // fallback image
  // Helper to create a box wrapper
  function wrapSection(heading, paragraph, imgUrl) {
    const wrapper = document.createElement('div');
    wrapper.className = 'content-box';
    // Apply background image via inline style for flexibility
    wrapper.style.backgroundImage = `url(${imgUrl})`;
    wrapper.style.backgroundSize = 'cover';
    wrapper.style.backgroundPosition = 'center';

    // Insert wrapper before heading and move heading + paragraph inside
    heading.parentNode.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);
    wrapper.appendChild(paragraph);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Select all heading elements (h1‑h4)
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    headings.forEach(function (heading) {
      // Find the next sibling that is a paragraph
      let next = heading.nextElementSibling;
      while (next && next.tagName !== 'P' && next.tagName !== 'DIV') {
        // Stop if another heading appears; we only wrap immediate paragraph
        if (/H[1-4]/.test(next.tagName)) return;
        next = next.nextElementSibling;
      }
      if (next && next.tagName === 'P') {
        // Use a data attribute on heading to optionally specify image
        const imgAttr = heading.getAttribute('data-bg');
        const imgUrl = imgAttr ? imgAttr.trim() : defaultImg;
        wrapSection(heading, next, imgUrl);
      }
    });
  });
})();
