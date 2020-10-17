/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// get all sections in page
const allSections = document.querySelectorAll('section');

// get navbar ul (li parent) by id
const navContainer = document.getElementById('navbar__list');

// define flag related to hide menu if user don't scroll on page
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to add class 'active' to section and related menu item
function setActiveToCorrectSectionAndNavItem(curSection){
    // get all menu links
    const navLinks = document.querySelectorAll('nav li a');

    // loop on menu links and set active
    navLinks.forEach(function(navLink) {
        if(navLink.getAttribute('href') == `#${curSection.id}`){
            navLink.classList.add('active');
        }else{
            navLink.classList.remove('active');
        }
    });

    // loop on sections and set active
    allSections.forEach(function(section) {
        if(curSection.id == section.id){
            curSection.classList.add('your-active-class');
        }else{
            section.classList.remove('your-active-class');
        }
    });
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build menu 
allSections.forEach(function(navItem) {
    const fragment = document.createDocumentFragment();
    const item = document.createElement('li');
    item.className = 'menu__link';
    
    // create link (a tag) and set attributes
    const sectionLink = document.createElement('a');
    sectionLink.innerText = navItem.dataset.nav;
    sectionLink.href = `#${navItem.id}`;

    // set a tag active according to active section
    if(navItem.classList.contains('your-active-class')){
        sectionLink.className = 'active';
    }

    // Scroll to section on link click
    sectionLink.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(`#${navItem.id}`);
        section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

        // set section and related menu item as active
        setActiveToCorrectSectionAndNavItem( section );
    });

    item.appendChild(sectionLink);
    fragment.appendChild(item);
    navContainer.appendChild(fragment);
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// listen for scroll event
window.addEventListener('scroll', function ( event ) {
    // display menu when user scroll in page
    document.getElementById("navbar__list").style.display = "block";

        allSections.forEach(function(section) {
        let rect = section.getBoundingClientRect();
        let y = rect.y;

        if (y < window.innerHeight) {
            // set section and related menu item as active
            setActiveToCorrectSectionAndNavItem(section);
        }
    });

	// clear timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// set a timeout to run after scrolling ends
    isScrolling = setTimeout(function(){ 
        // hide menu
        document.getElementById("navbar__list").style.display = "none";
    }, 3000);

}, false);






