const calendarContainer = document.querySelector(".container");
const calendarDays = 24;
let discountCodes = [];

// Function to load discount codes from the JSON file
const loadDiscountCodes = async () => {
    try {
        const response = await fetch('./assets/tarjoukset.json'); // Adjust the path if necessary
        const data = await response.json();
        discountCodes = data.christmasSpecials; // Store the codes from the JSON file
        createCalendar(); // Create the calendar after loading discount codes
    } catch (error) {
        console.error("Error loading discount codes:", error);
    }
};


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
    const isDevMode = true; // Set this to false for the final version and true while testing

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
        calendarContainer.appendChild(calendarDoor);
        
        const doorNumber = document.createElement("div");
        doorNumber.classList.add("text");
        doorNumber.innerHTML = i + 1;
        calendarDoor.appendChild(doorNumber);
        
        calendarDoor.addEventListener("click", (event) => openDoor(event, i + 1));
    }
};

// Initialize calendar on page load
window.onload = createCalendar;
