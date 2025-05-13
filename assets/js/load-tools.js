/**
 * Tools Data Loader
 * Loads tool data from JSON file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load tools data
    loadToolsData();
});

/**
 * Loads tools data from JSON file
 */
function loadToolsData() {
    // Check if we need to load tools data (only on pages that use it)
    const toolsContainer = document.getElementById('tools-container');
    const latestToolsContainer = document.getElementById('latest-tools-container');
    
    if (!toolsContainer && !latestToolsContainer) {
        return; // No need to load data on this page
    }
    
    // Create a fetch request with cache-busting parameter
    fetch('data/tools.json?v=' + new Date().getTime())
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Tools data loaded successfully');
            // Store data in a global variable for other scripts to use
            window.toolsData = data;
            
            // Dispatch a custom event to notify other scripts that data is loaded
            const event = new CustomEvent('toolsDataLoaded', { detail: data });
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error('Error loading tools data:', error);
            // Show a user-friendly error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <h3>Failed to load data</h3>
                <p>We're having trouble loading the tools data. Please try refreshing the page.</p>
                <p>Error details: ${error.message}</p>
            `;
            
            // Add error message to the page
            if (toolsContainer) {
                toolsContainer.appendChild(errorMessage);
            } else if (latestToolsContainer) {
                latestToolsContainer.appendChild(errorMessage);
            }
        });
}
