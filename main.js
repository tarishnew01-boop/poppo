const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const logo = document.getElementById('logo');
const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollTopBtnContainer = document.getElementById('scrollTopBtnContainer');
const navbar = document.getElementById('header');
const countryCodeSelect = document.getElementById('country-code');
const registrationForm = document.getElementById('registrationForm');
const modal = document.getElementById('modal');
// Mobile Dropdown
// const mobileDownloadToggle = document.getElementById('mobileDownloadToggle');
// const mobileDownloadMenu = document.getElementById('mobileDownloadMenu');

// mobileDownloadToggle.addEventListener('click', function () {
//     mobileDownloadMenu.classList.toggle('hidden');
// });

// Desktop Dropdown
const desktopDownloadToggle = document.getElementById('desktopDownloadToggle');
const desktopDownloadMenu = document.getElementById('desktopDownloadMenu');

desktopDownloadToggle.addEventListener('click', function () {
    desktopDownloadMenu.classList.toggle('hidden');
});

// Close dropdown when clicking outside for both mobile and desktop
window.addEventListener('click', function (e) {
    // if (!mobileDownloadToggle.contains(e.target) && !mobileDownloadMenu.contains(e.target)) {
    //     mobileDownloadMenu.classList.add('hidden');
    // }
    if (!desktopDownloadToggle.contains(e.target) && !desktopDownloadMenu.contains(e.target)) {
        desktopDownloadMenu.classList.add('hidden');
    }
});

// Toggle mobile menu
const toggleMenuVisibility = () => {
    mobileMenu.classList.toggle('mt-[0]');
    menuToggle.classList.toggle('hidden');
    logo.classList.toggle('hidden');
    // mobileDownloadToggle.classList.toggle('hidden');
    nav.classList.toggle('hidden');
};

menuToggle.addEventListener('click', toggleMenuVisibility);
closeMenu.addEventListener('click', toggleMenuVisibility);



    // const scrollTopBtn = document.getElementById('scrollTopBtn');
    // const scrollTopBtnContainer = document.getElementById('scrollTopBtnContainer');

    // Function to check scroll position and toggle the button visibility
    window.onscroll = () => {
        // If the page is scrolled more than 100px, show the button
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtnContainer.classList.remove('opacity-0', 'translate-y-6'); // Show button
            scrollTopBtnContainer.classList.add('opacity-100', 'translate-y-0'); // Make it visible with smooth transition
        } else {
            scrollTopBtnContainer.classList.remove('opacity-100', 'translate-y-0'); // Hide button
            scrollTopBtnContainer.classList.add('opacity-0', 'translate-y-6'); // Fade out and move down
        }
    };
    
    // Scroll to top when the button is clicked
    scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });




// Disable right-click and block common keyboard shortcuts
document.addEventListener('contextmenu', (event) => event.preventDefault());

const blockedKeys = new Set(['F12', 'i', 'j', 'u' ,'I', 'U', 'J']);
document.addEventListener('keydown', (event) => {
    if (blockedKeys.has(event.key) && 
        (event.ctrlKey || event.shiftKey)) {
        event.preventDefault();
    }
});

// Open modal
const toggleModalVisibility = (isVisible) => {
    modal.classList.toggle('hidden', !isVisible);
};

document.querySelectorAll('.openModal').forEach(button => {
    button.addEventListener('click', () => toggleModalVisibility(true));
});

document.querySelectorAll('.closeModal').forEach(button => {
    button.addEventListener('click', () => toggleModalVisibility(false));
});

// Fetch country codes
async function fetchCountryCodes() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();

        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        countries.forEach(country => {
            const callingCode = country.idd?.root + (country.idd?.suffixes?.[0] || '');
            if (callingCode) {
                const option = new Option(`${country.name.common} (${callingCode})`, callingCode);
                countryCodeSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Failed to fetch country codes:', error);
    }
}


fetchCountryCodes();

// Handle form submission
registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailParams = {
        id: document.getElementById('id').value,
        role: document.querySelector('input[name="role"]:checked').value,
        country_code: countryCodeSelect.value,
        number: document.getElementById('phone-number').value,
    };

    try {
        await emailjs.send('service_0ur8ahk', 'template_2frc2n6', emailParams);
        alert('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send email.');
    } finally {
        toggleModalVisibility(false); // Close the modal after submission
    }
});
