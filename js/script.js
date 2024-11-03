const calendarContainer = document.querySelector(".container");
const calendarDays = 24;
let discountCodes = [];

// Function to load discount codes from the JSON file
const loadDiscountCodes = async () => {
    try {
        const response = await fetch('./assets/tarjoukset.json'); // Ensure this path is correct
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        discountCodes = data.christmasSpecials; // Store the codes from the JSON file
        console.log("Discount codes loaded:", discountCodes); // Log loaded discount codes
        createCalendar(); // Create the calendar after loading discount codes
    } catch (error) {
        console.error("Error loading discount codes:", error); // Log any errors
        createCalendar(); // Create the calendar even if loading fails
    }
};

// Function to open a door
const openDoor = (path, event, doorDay) => {
    let today = new Date();
    let daynow = today.getDate();
    let monthnow = today.getMonth();
    
    // Check if the door should be opened
    if (event.target.classList.contains("opened")) {
        return; // Prevent opening again if already opened
    }

    // Alert the user if trying to open before December or before the specific door day
    if (monthnow !== 11) {
        alert("This feature opens in December."); 
        return; 
    }
    if (daynow < doorDay) {
        alert(`This door cannot be opened until December ${doorDay}.`);
        return;
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
        
        // Change this to a secure image path
        let coursePath = `https://annikagronqvist.free.nf/Uppg3/img/bild-1.jpg`;
        calendarDoor.addEventListener("click", openDoor.bind(null, coursePath, null, i + 1));
    }
};

// Initialize calendar on page load and load discount codes
window.onload = loadDiscountCodes;
