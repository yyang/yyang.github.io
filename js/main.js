var normal = document.getElementById("nav-menu");

var icon = normal !== null ? normal : reverse;

// Toggle the "menu-open" % "menu-opn-left" classes
function toggle() {
	  var nav = document.getElementById("nav");
	  var button = document.getElementById("menu");
	  
	  if (nav.className == "menu-open" || nav.className == "menu-open-left") {
	  	  nav.className = "";
	  	  button.className = "";
	  } else {
	  	  nav.className += "menu-open";
	  	  button.className += "btn-close";
	    }
	}

// Ensures backward compatibility with IE old versions
function menuClick() {
	if (document.addEventListener && icon !== null) {
		icon.addEventListener('click', toggle);
	} else if (document.attachEvent && icon !== null) {
		icon.attachEvent('onclick', toggle);
	} else {
		return;
	}
}

menuClick();