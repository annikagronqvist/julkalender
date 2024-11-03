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
    { label: "Verkkotuotteet -40%", code: "DOE" },
    { label: "1Tb SSD 49€", code: "DOE" },
    { label: "Intel tuotteet -22%", code: "DOE" },
    { label: "AMD 6600XT 249€", code: "DOE" },
    { label: "Bluetooth-kaiutin - 15%", code: "SPEAKER!%" },
    { label: "Vakuutus -10%", code: "INSURE10" },
    { label: "Lautaset -50%", code: "PLATE50" },
    { label: "Kuulokkeet -20%", code: "HEADPHONES20" },
    { label: "Hiiri -15%", code: "MOUSE15" },
    { label: "Käytetyt pelit -30%", code: "GAMES30" },
    { label: "Kamerat -25%", code: "CAMERA25" },
    { label: "Matkapuhelimet -10%", code: "PHONE10" },
    { label: "Tarvikkeet -40%", code: "ACCESSORIES40" },
    { label: "Älykellot -20%", code: "SMARTWATCH20" },
    { label: "Käytetyt laitteet -15%", code: "USED15" },
    { label: "Pehmeät lelulelut -50%", code: "SOFTTOY50" },
    { label: "Pelaajat -30%", code: "PLAYERS30" },
    { label: "Tietokoneet -20%", code: "PC20" },
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
    const isDevMode = false; // Set this to false for the final version

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
    const discountCode = document.createElement("div");
    discountCode.innerText = getDiscountCode(doorDay); // Get the discount code for this door
    discountCode.classList.add("discount-code");
    event.target.appendChild(discountCode); // Add the discount code to the door
    discountCode.style.display = "block"; // Show the discount code
};

// Function to retrieve discount code based on door number
const getDiscountCode = (doorNumber) => {
    const discount = discountCodes[doorNumber - 1]; // Adjusting to 0-based index
    if (discount) {
        return `${discount.label} - Code: ${discount.code}`; // Format the output consistently
    }
    return "No code available";
};

// Function to create the calendar doors
const createCalendar = () => {
    for (let i = 0; i < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        calendarDoor.classList.add("door");
        calendarContainer.appendChild(calendarDoor);
        
        const doorNumber = document.createElement("div");
        doorNumber.classList.add("text");
        doorNumber.innerHTML = i + 1; // Door number starts at 1
        calendarDoor.appendChild(doorNumber);
        
        calendarDoor.addEventListener("click", (event) => openDoor(event, i + 1));
    }

    // Shuffle the doors after creating them
    shuffleDoors();
};

// Function to shuffle the doors in the DOM
const shuffleDoors = () => {
    const doors = Array.from(calendarContainer.children);
    // Fisher-Yates shuffle
    for (let i = doors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap the doors
        calendarContainer.appendChild(doors[j]); // Move the shuffled door to the end
    }
};

// Initialize calendar on page load
window.onload = createCalendar;
