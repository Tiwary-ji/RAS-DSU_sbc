// Function to determine the relative path to 'header-footer.html'
function getBasePath() {
    const depth = window.location.pathname.split('/').length - 2;
    return '../'.repeat(depth) + 'Common/header-footer.html';
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
        // Create a temporary container to hold the fetched content
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

        // Now add the event listener for the hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navPanel = document.getElementById('nav-links');

        if (hamburger && navPanel) {
            hamburger.addEventListener('click', function () {
                if (navPanel.style.display === 'block') {
                    navPanel.style.display = 'none';
                } else {
                    navPanel.style.display = 'block';
                }
            });
        } else {
            console.error("Hamburger or nav-links element not found.");
        }

        // Add event listeners to prevent default behavior of dropdown links
        const dropdownLinks = document.querySelectorAll('.dropdown > a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Prevent the default link behavior
                event.preventDefault();

                // Toggle visibility of the dropdown menu
                const dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            });
        });
    })
    .catch(error => console.error('Error loading header-footer:', error));
