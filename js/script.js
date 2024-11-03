const calendarContainer = document.querySelector(".container");
const calendarDays = 24;

// Array of discount codes with labels and codes
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
    { label: "Gaming näppäimistö - 25%", code: "KEYBOARD25" },
    { label: "Älypuhelin 199€", code: "SMARTPHONE199" },
    { label: "Pelituoli - 30%", code: "CHAIR30" },
    { label: "Konsoli 399€", code: "CONSOLE399" },
    { label: "Kiintolevy - 50%", code: "HDD50" },
    { label: "Televisio - 15%", code: "TV15" },
    { label: "Kamera - 20%", code: "CAMERA20" },
    { label: "Tabletti - 10%", code: "TABLET10" },
    { label: "Langattomat kuulokkeet - 20%", code: "HEADPHONES20" },
    { label: "Reppu - 15%", code: "BAG15" },
    { label: "Muistikortti - 30%", code: "SDCARD30" },
    { label: "Kaapelit - 40%", code: "CABLES40" },
    { label: "Äänijärjestelmä - 25%", code: "SOUND25" },
    { label: "Pöytäkone - 20%", code: "DESKTOP20" },
    { label: "Pelit - 50%", code: "GAMES50" },
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

    // Alert the user if trying to open before December or before the specific door day
    if (!isDevMode) {
        if (monthnow !== 11) { // Months are 0-indexed (0 = January, 11 = December)
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
    
    // Format to show both label and code
    const discountInfo = getDiscountInfo(doorDay);
    discountCode.innerText = discountInfo; // Set the inner text to the formatted string
    discountCode.classList.add("discount-code");
    event.target.appendChild(discountCode); // Add the discount code to the door
    discountCode.style.display = "block"; // Show the discount code
};

// Function to retrieve discount information based on door number
const getDiscountInfo = (doorNumber) => {
    const discount = discountCodes[doorNumber - 1];
    if (discount) {
        return `${discount.label}, code: ${discount.code}`;
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
        doorNumber.innerHTML = i + 1;
        calendarDoor.appendChild(doorNumber);
        
        calendarDoor.addEventListener("click", (event) => openDoor(event, i + 1));
    }
};

// Initialize calendar on page load
window.onload = createCalendar;
