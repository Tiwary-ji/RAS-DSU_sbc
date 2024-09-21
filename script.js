// Load the combined header and footer
fetch('header-footer.html')
    .then(response => response.text())
    .then(data => {
        // Create a temporary container to hold the fetched content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Extract and insert the header
        const header = tempDiv.querySelector('header');
        if (header) {
            document.getElementById('header-placeholder').innerHTML = header.outerHTML;
        }

        // Extract and insert the footer
        const footer = tempDiv.querySelector('footer');
        if (footer) {
            document.getElementById('footer-placeholder').innerHTML = footer.outerHTML;
        }
    });


//add an event listener for hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navPanel = document.getElementById('nav-links');

    hamburger.addEventListener('click', function() {
        if (navPanel.style.display === 'block') {
            navPanel.style.display = 'none';
        } else {
            navPanel.style.display = 'block';
        }
    });
});

//event

