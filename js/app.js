
let menuOpen = false;

function toggleMenu() {
  if(!menuOpen) { // open
    $('#menu').animate({
      right: 0
    }, 300, 'swing');
  } 
  else { // close 
    $('#menu').animate({
      right: -360
    }, 300, 'swing');
  }
  menuOpen = !menuOpen;
} // toggleMenu()