// create-event.js

const eventList = document.getElementById("event-list");

eventList.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const eventName = document.getElementById("event-name").value;
    const eventDescription = document.getElementById("event-description").value;
    const eventDate = document.getElementById("event-date").value;
    const eventTime = document.getElementById("event-time").value;
    
    // Retrieve the selected file
    const eventBrochureInput = document.getElementById("event-brochure");
    const selectedFile = eventBrochureInput.files[0];

    // You can use this data to create the event and send it to a backend server
    console.log("Event Name:", eventName);
    console.log("Event Description:", eventDescription);
    console.log("Event Date:", eventDate);
    console.log("Event Time:", eventTime);
    console.log("Event Brochure:", selectedFile);

    // Clear form inputs after event creation
    eventForm.reset();
});
