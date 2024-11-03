// Select the calendar container
const calendarContainer = document.querySelector(".container");

// Number of days in the calendar
const calendarDays = 24;

// Discount codes array
const discountCodes = [
    { label: "Läppärit -20%", code: "ASDJKL9023" },
    { label: "Ilmainen toimitus", code: "VNKJDO0987" },
    { label: "Muistikortit ja muistitikut puoleen hintaan", code: "IOSDFJ872" },
    { label: "Geforce näytönohjaimet -30%", code: "KLHJ8976" },
    { label: "Samsung 55'' televisio 399€", code: "SDFJKL9080" },
    { label: "Robottipölynimuri 129€", code: "PQWO23894" },
    { label: "Verkkotuotteet -40%", code: "Doe" },
    { label: "1Tb SSD 49€", code: "Doe" },
    { label: "Intel tuotteet -22%", code: "Doe" },
    { label: "AMD 6600XT 249€", code: "Doe" }
];

// Function to handle opening a door
const openDoor = (event, doorDay, discount) => {
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

    // Reveal the discount code
    event.target.innerHTML = `
        <div class="discount-label">${discount.label}</div>
        <div class="discount-code">${discount.code}</div>
    `;
    event.target.classList.add("opened");
};

// Function to create the calendar
const createCalendar = () => {
    for (let i = 0; i < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        const calendarDoorText = document.createElement("div");

        calendarDoor.classList.add("door"); // Updated class name to 'door'
        calendarDoor.style.gridArea = "door" + (i + 1); // Make sure the grid styling works
        calendarContainer.appendChild(calendarDoor);

        calendarDoorText.classList.add("text");
        calendarDoorText.innerHTML = i + 1; // Display day number on the door
        calendarDoor.appendChild(calendarDoorText);

        // Get a discount code (cycling through if there are not enough)
        const discount = discountCodes[i % discountCodes.length];

        // Add event listener to each door
        calendarDoor.addEventListener("click", (event) => openDoor(event, i + 1, discount));
    }
};

// Automatically create the calendar when the page loads
document.addEventListener("DOMContentLoaded", createCalendar);
