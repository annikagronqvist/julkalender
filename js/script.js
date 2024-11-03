const openDoor = (path, event, doorDay) => {
    let today = new Date();
    let daynow = today.getDate();
    let monthnow = today.getMonth();
    
    // Check if the door should be opened
    if (event.target.classList.contains("opened")) {
        return; // Prevent opening again if already opened
    }

    // Check if we are in development mode
    const isDevMode = true; // Set this to false when you're ready for final submission

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
    // Adjust this logic as per your actual codes' arrangement
    return discountCodes[doorNumber - 1]?.code || "No code available";
};

// Function to create the calendar doors
const createCalendar = () => {
    for (let i = 0; i < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        calendarDoor.classList.add("door"); // Changed to "door" class
        calendarDoor.style.gridArea = "door" + (i + 1);
        calendarContainer.appendChild(calendarDoor);
        
        const doorNumber = document.createElement("div");
        doorNumber.classList.add("text");
        doorNumber.innerHTML = i + 1;
        calendarDoor.appendChild(doorNumber);
        
        let coursePath = `http://annikagronqvist.free.nf/Uppg3/img/bild-1.jpg`;
        calendarDoor.addEventListener("click", openDoor.bind(null, coursePath, null, i + 1));
    }
};

// Initialize calendar on page load
window.onload = createCalendar;
