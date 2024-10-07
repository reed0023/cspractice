document.addEventListener("DOMContentLoaded", function() {
    const scriptContainer = document.getElementById("script-container");
    let currentScript = '';
    let currentIndex = 0;
    
    // Load a new script from the server
    function fetchNewScript() {
        fetch('/scripts') // Replace with your server endpoint
            .then(response => response.text())
            .then(script => {
                currentScript = script;
                currentIndex = 0;
                updateDisplay();
            })
            .catch(error => console.error('Error fetching new script:', error));
    }

    // Update the display with the current script
    function updateDisplay() {
        const typedText = currentScript.substring(0, currentIndex);
        const nextChar = currentScript[currentIndex]; // Get the next character
        const remainingText = currentScript.substring(currentIndex + 1);
        const progressPercentage = (currentIndex / currentScript.length) * 100;
        scriptContainer.innerHTML = `<span class="typed-text">${typedText}</span><span class="flash">${nextChar}</span><span class="remaining-text">${remainingText}</span>`;
        document.getElementById("progress").style.width = progressPercentage + '%';
        document.getElementById("progress-percentage").textContent = progressPercentage.toFixed(0) + '%';
    }

    // Event listener for keydown events to handle typing
    document.addEventListener('keydown', function(event) {
        // Check if the next character is a newline and the Enter key is pressed
        if (currentScript[currentIndex] === '\n' && event.key === 'Enter') {
            currentIndex++;
            updateDisplay();
            event.preventDefault(); // Prevent default to avoid additional newline
        }
        // Check if the pressed key matches the current character
        else if (currentIndex < currentScript.length && event.key === currentScript[currentIndex]) {
            currentIndex++;
            updateDisplay();
        }
    });

    // Event listener for the 'Load New Script' button
    document.getElementById("load-new-script").addEventListener('click', function(event) {
        fetchNewScript();
        event.currentTarget.blur();  // Remove focus from the button after it's clicked
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            event.preventDefault();  // Prevent default action for space key
        }
        // ... rest of the key handling logic ...
    });
    

    // Load the initial script
    fetchNewScript();
});
