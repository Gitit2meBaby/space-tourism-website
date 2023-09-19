document.addEventListener('DOMContentLoaded', () => {


    let jsonData;

    // Fetch the JSON data
    async function loadJsonFile() {
        try {
            const response = await fetch('starter-code/data.json');
            jsonData = await response.json();
            console.log('JSON data loaded successfully:', jsonData);

        } catch (error) {
            console.error('Error loading JSON file:', error);
        }
    }

    // POPULATE CONTENT ON PAGE LOAD
    loadJsonFile().then(() => {
        updateDestination('Moon');
        updateCrew('Douglas Hurley');
        updateTech('Launch vehicle');
    });

    // MOBILE MENU ------------------
    const menuToggle = document.querySelector('#hamburger')
    const mobileNav = document.querySelector('.mobile-nav')
    const closeBtn = document.querySelector('#closeBtn')

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.remove('hidden')
        menuToggle.classList.add('hidden')
    })
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.add('hidden')
        menuToggle.classList.remove('hidden')
    })

    // DESTINATION ------------------
    //destination variables
    const destinationImage = document.querySelector('#destinationImage')
    const destinationTitle = document.querySelector('#destinationTitle');
    const destinationInfo = document.querySelector('#destinationInfo');
    const distance = document.querySelector('#distance');
    const travelTime = document.querySelector('#travelTime');

    // Function to update destination information
    function updateDestination(destinationName) {

        const destinationData = jsonData.destinations.find(destination => destination.name.toLowerCase() === destinationName.toLowerCase());

        if (destinationData) {
            destinationTitle.textContent = destinationData.name;
            destinationInfo.textContent = destinationData.description;
            distance.textContent = destinationData.distance;
            travelTime.textContent = destinationData.travel;
            destinationImage.src = `starter-code/${destinationData.images.webp}`;
        }
    }

    // cycle through the different destinations
    document.addEventListener('click', (event) => {
        const activeNavItem = document.querySelector('.active-nav-item');

        if (activeNavItem) {
            activeNavItem.classList.remove('active-nav-item');
        }
        if (event.target.classList.contains('moon')) {
            const moonNav = event.target.closest('.list-item')
            moonNav.classList.add('active-nav-item');
            updateDestination('Moon');
        } else if (event.target.classList.contains('mars')) {
            const marsNav = event.target.closest('.list-item')
            marsNav.classList.add('active-nav-item');
            updateDestination('Mars');
        } else if (event.target.classList.contains('europa')) {
            const europaNav = event.target.closest('.list-item')
            europaNav.classList.add('active-nav-item');
            updateDestination('Europa');
        } else if (event.target.classList.contains('titan')) {
            const titanNav = event.target.closest('.list-item')
            titanNav.classList.add('active-nav-item');
            updateDestination('Titan');
        }
    });

    /// CREW ------------
    const crewImage = document.querySelector('#crewImage');
    const crewPosition = document.querySelector('#position');
    const crewNameElement = document.querySelector('#name');
    const crewInfo = document.querySelector('#crewInfo');

    const toggleButtons = document.querySelectorAll('.toggle');

    toggleButtons.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            toggleButtons.forEach(btn => btn.classList.remove('active-toggle'));
            toggle.classList.add('active-toggle');
            const crewName = toggle.getAttribute('data-crew');

            updateCrew(crewName);
        });
    });

    // Function to update crew information
    function updateCrew(crewName) {
        const crewData = jsonData.crew.find(crew => crew.name.toLowerCase() === crewName.toLowerCase());

        if (crewData) {
            crewNameElement.textContent = crewData.name;
            crewInfo.textContent = crewData.bio;
            crewPosition.textContent = crewData.role;
            crewImage.src = `starter-code/${crewData.images.webp}`;
        }
    }

    //TECHNOLOGY --------------
    const techNameElement = document.querySelector('#techName');
    const techInfo = document.querySelector('#techInfo');
    const techImage = document.querySelector('#techImage')

    // Function to update technology information
    function updateTech(techName) {
        console.log('updateTech called with techName:', techName);

        if (techName) {
            if (jsonData && jsonData.technology) {
                const techData = jsonData.technology.find(
                    tech => tech.name.toLowerCase() === techName.toLowerCase()
                );

                if (techData) {
                    techNameElement.textContent = techData.name;
                    techInfo.textContent = techData.description;
                    techImage.src = `starter-code/${techData.images.portrait}`;
                }
            }
        }
    }

    // Add event listeners to technology toggle buttons
    const techToggleButtons = document.querySelectorAll('.technology-toggle-btn');

    techToggleButtons.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            techToggleButtons.forEach(btn => btn.classList.remove('technology-toggle-active'));
            const techName = event.target.getAttribute('data-technology') || event.target.closest('.technology-toggle-btn').getAttribute('data-technology');
            console.log('Clicked toggle:', event.target);
            console.log('techName:', techName);
            console.log('click tech');
            updateTech(techName);
            toggle.classList.add('technology-toggle-active');
        });
    });


});
