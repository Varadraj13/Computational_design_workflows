// Wait for the DOM to be fully loaded before running the code
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button using its ID
    const button = document.getElementById("changeTextBtn");

    // Get a reference to the paragraph we want to change
    const text = document.getElementById("dynamicText");

    // Add an event listener to the button
    button.addEventListener("click", function () {
        // Change the text content when the button is clicked
        text.textContent = "🎉 You clicked the button! 🎉";
    });
});
