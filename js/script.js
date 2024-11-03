const calendarContainer = document.querySelector(".container");
const calendarDays = 24;

// Array of discount codes with labels
const discountCodes = [
    { label: "Läppärit -20%", code: "ASDJKL9023" },
    { label: "Ilmainen toimitus", code: "VNKJDO0987" },
    { label: "Muistikortit ja muistitukut puoleen hintaan", code: "IOSDFJ872" },
    { label: "Geforce näytönohjaimet -30%", code: "KLHJ8976" },
    { label: "Samsung 55'' televisio 399€", code: "SDFJKL9080" },
    { label: "Robottipölynimuri 129€", code: "PQWO23894" },
    { label: "Verkkotuotteet -40%", code: "DOE" },
    { label: "1Tb SSD 49€", code: "DOE" },
    { label: "Intel tuotteet -22%", code: "DOE" },
    { label: "AMD 6600XT 249€", code: "DOE" }
];

// Function to open a door
const openDoor = (event, doorDay) => {
    let today = new Date();
    let daynow = today.getDate();
    let monthnow = today.getMonth();
    
    // Check if the door has already been opened
    if (event.target.classList.contains("opened")) {
        return; // Prevent opening again if already opened
    }

    // Check if we are in development mode
    const isDevMode = true; // Set this to false for the final version

    // Only alert in production mode
    if (!isDevMode) {
        if (monthnow !== 11) {
            alert("This feature opens in December."); 
            return; 
        }
        if (daynow < doorDay) {
            alert(`You cannot open door ${doorDay} until December ${doorDay}.`);
            return;
        }
    }
    
    // Open the door and show the discount code
    event.target.classList.add("opened"); // Mark the door as opened
    
    // Create a new div for the discount code
    const discountCode = document.createElement("div");
    
    // Get the discount label and code for this door
    const discountInfo = getDiscountCode(doorDay);
    
    // Log the doorDay and corresponding discount information for debugging
    console.log(`Door: ${doorDay}, Discount Info: ${discountInfo}`);

    discountCode.innerText = discountInfo; // Set the discount info text
    discountCode.classList.add("discount-code");
    event.target.appendChild(discountCode); // Add the discount code to the door
    
    // Show the discount code
    discountCode.style.display = "block"; // Show the discount code
};

// Function to retrieve discount info based on door number
const getDiscountCode = (doorNumber) => {
    // Return the label and code if available
    const discount = discountCodes[doorNumber - 1];
    if (discount) {
        return `${discount.label}: ${discount.code}`; // Format the output
    }
    return "No code available"; // For doors beyond available codes
};

// Function to create the calendar doors
const createCalendar = () => {
    for (let i = 0; i < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        calendarDoor.classList.add("door");
        calendarContainer.appendChild(calendarDoor);
        
        const doorNumber = document.createElement("div");
        doorNumber.classList.add("text");
        doorNumber.innerHTML = i + 1; // Set the door number text
        calendarDoor.appendChild(doorNumber);
        
        // Add event listener for door click
        calendarDoor.addEventListener("click", (event) => openDoor(event, i + 1));
    }
};

// Initialize calendar on page load
window.onload = createCalendar;
