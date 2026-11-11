/* ============================================================
   app.js
   ------------------------------------------------------------
   Site-wide chrome: footer year, hamburger <-> nav toggle.
   Contact form checks live in contact.js; the header animation
   lives in HeaderScene.js.
   ============================================================ */

// #region Footer Year
// Keeps the copyright year in the footer accurate without a
// yearly manual edit.
let year1 = new Date();
document.querySelector('#year').textContent = year1.getFullYear();
// #endregion

// #region Side Navigation Toggle
// The nav and its hamburger button are revealed together with a
// circular "wipe" (see css/app.css region 5) instead of a slide.

let isMenuOpen = True

const hamburgerButton = document.querySelector('#hamburger');
const siteNav = document.querySelector('nav');

hamburgerButton.addEventListener('click', toggleMenu);

// Close the menu automatically whenever any link inside it is
// clicked (including in-page anchors like the footer "top" link).
const allLinks = document.querySelectorAll('a');
for (let i = 0; i < allLinks.length; i++) {
  allLinks[i].addEventListener('click', closeMenu);
}

// The Escape key closes the menu too (keyboard users).
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && isMenuOpen) {
    closeMenu();
    hamburgerButton.focus();
  }
});

/**
 * Flips the nav + hamburger between open and closed.
 */
function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  updateMenu();
} // toggleMenu()

/**
 * Forces the nav + hamburger closed. Safe to call even if the
 * menu is already closed.
 */
function closeMenu() {
  isMenuOpen = false;
  updateMenu();
} // closeMenu()

/**
 * Applies the current isMenuOpen state to the nav, the button and
 * its accessibility attributes.
 */
function updateMenu() {
  siteNav.classList.toggle('isOpen', isMenuOpen);
  hamburgerButton.classList.toggle('isOpen', isMenuOpen);
  hamburgerButton.setAttribute('aria-expanded', String(isMenuOpen));
  hamburgerButton.setAttribute('aria-label', isMenuOpen ? 'Close menu' : 'Open menu');
} // updateMenu()
// #endregion
