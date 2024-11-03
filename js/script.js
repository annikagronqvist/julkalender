document.addEventListener("DOMContentLoaded", () => {
    const calendarContainer = document.querySelector(".container");
    const calendarDays = 24;

    // Function to handle opening a door
    const openDoor = (event, doorDay) => {
        const today = new Date();
        const dayNow = today.getDate();
        const monthNow = today.getMonth();

        if (monthNow !== 11) { // Check if it's not December
            alert("This feature opens in December.");
            return;
        }
        if (dayNow < doorDay) { // Check if the door is opened too soon
            alert(`This door cannot be opened until December ${doorDay}.`);
            return;
        }

        event.target.classList.add("opened"); // Mark the door as opened
    };

    // Function to create the calendar
    const createCalendar = () => {
        for (let i = 0; i < calendarDays; i++) {
            const calendarDoor = document.createElement("div");
            calendarDoor.classList.add("door");

            const doorNumber = i + 1;
            calendarDoor.textContent = doorNumber; // Set the door number

            // Add event listener to open the door
            calendarDoor.addEventListener("click", (event) => openDoor(event, doorNumber));

            calendarContainer.appendChild(calendarDoor); // Append the door to the container
        }
    };

    createCalendar(); // Call the function to create the calendar
});
