// Function to determine the relative path to 'header-footer.html'
function getBasePath() {
    const depth = window.location.pathname.split('/').length - 2;
    return '../'.repeat(depth) + 'ras_dsu/Common/header-footer.html';
}

// Fetch the header and footer HTML
fetch(getBasePath())
    .then(response => {
        if (!response.ok) {
            console.error('Failed to load header-footer.html. Status:', response.status);
            throw new Error('Failed to load header-footer');
        }
        return response.text();
    })
    .then(data => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Extract and insert the header
        const header = tempDiv.querySelector('header');
        if (header) {
            document.getElementById('header-placeholder').innerHTML = header.outerHTML;
            console.log('Header loaded successfully.');
        } else {
            console.error('Header element not found in header-footer.html');
        }

        // Extract and insert the footer
        const footer = tempDiv.querySelector('footer');
        if (footer) {
            document.getElementById('footer-placeholder').innerHTML = footer.outerHTML;
            console.log('Footer loaded successfully.');
        } else {
            console.error('Footer element not found in header-footer.html');
        }

        // Add event listener for the hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navPanel = document.getElementById('nav-links');

        if (hamburger && navPanel) {
            hamburger.addEventListener('click', function () {
                navPanel.style.display = (navPanel.style.display === 'block') ? 'none' : 'block';
            });

            // Close navPanel when clicking outside
            document.addEventListener('click', function (event) {
                if (navPanel.style.display === 'block' && !hamburger.contains(event.target) && !navPanel.contains(event.target)) {
                    navPanel.style.display = 'none';
                }
            });
        } else {
            console.error("Hamburger or nav-links element not found.");
        }

        // Add event listeners to prevent default behavior of dropdown links
        const dropdownLinks = document.querySelectorAll('.dropdown > a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default link behavior
                const dropdownContent = this.nextElementSibling;
                dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function (event) {
            dropdownLinks.forEach(link => {
                const dropdownContent = link.nextElementSibling;
                if (dropdownContent && dropdownContent.style.display === 'block' &&
                    !dropdownContent.contains(event.target) && !link.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                }
            });
        });
    })
    .catch(error => console.error('Error loading header-footer:', error));
