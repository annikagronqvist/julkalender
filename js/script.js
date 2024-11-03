const calendarContainer = document.querySelector(".container");
const calendarDays = 24;

// Array of discount codes
const discountCodes = [
    { label: "Läppärit -20%", code: "ASDJKL9023" },
    { label: "Ilmainen toimitus", code: "VNKJDO0987" },
    { label: "Muistikortit ja muistitukut puoleen hintaan", code: "IOSDFJ872" },
    { label: "Geforce näytönohjaimet -30%", code: "KLHJ8976" },
    { label: "Samsung 55'' televisio 399€", code: "SDFJKL9080" },
    { label: "Robottipölynimuri 129€", code: "PQWO23894" },
    { label: "Verkkotuotteet -40%", code: "Doe" },
    { label: "1Tb SSD 49€", code: "Doe" },
    { label: "Intel tuotteet -22%", code: "Doe" },
    { label: "AMD 6600XT 249€", code: "Doe" }
];

// Function to open a door
const openDoor = (path, event, doorDay) => {
    let today = new Date();
    let daynow = today.getDate();
    let monthnow = today.getMonth();
    
    // Check if the door has already been opened
    if (event.target.classList.contains("opened")) {
        return; // Prevent opening again if already opened
    }

    // Development mode flag
    const isDevMode = true; // Set this to false for the final version

    // Only alert in production mode
    if (!isDevMode) {
        if (monthnow !== 11) {
            alert("This feature opens in December."); 
            return; 
        }
        if (daynow < doorDay) {
            alert(`This door cannot be opened until December ${doorDay}.`);
            return;
        }
    }
    
    // Open the door and show the image
    event.target.style.backgroundImage = `url(${path})`;
    event.target.classList.add("opened"); // Mark the door as opened
    
    // Show discount code when the door is opened
    const discountCode = document.createElement("div");
    discountCode.innerText = getDiscountCode(doorDay); // Get the discount code for this door
    discountCode.classList.add("discount-code");
    event.target.appendChild(discountCode); // Add the discount code to the door
};

// Function to retrieve discount code based on door number
const getDiscountCode = (doorNumber) => {
    return discountCodes[doorNumber - 1]?.code || "No code available";
};

// Function to create the calendar doors
const createCalendar = () => {
    for (let i = 0; i < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        calendarDoor.classList.add("door");
        calendarDoor.style.gridArea = "door" + (i + 1);
        calendarContainer.appendChild(calendarDoor);
        
        const doorNumber = document.createElement("div");
        doorNumber.classList.add("text");
        doorNumber.innerHTML = i + 1;
        calendarDoor.appendChild(doorNumber);
        
        let coursePath = `http://annikagronqvist.free.nf/Uppg3/img/bild-1.jpg`;
        calendarDoor.addEventListener("click", (event) => openDoor(coursePath, event, i + 1)); // Pass the event
    }
};

// Initialize calendar on page load
window.onload = createCalendar;
