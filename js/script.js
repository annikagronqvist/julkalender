const calendarButton = document.querySelector(".btn-start");
const calendarContainer = document.querySelector(".container");

const calendarDays = 24;

/*const koder = {
   "christmasSpecials":[
  { "label":"Läppärit -20%", "code":"ASDJKL9023" },
  { "label":"Ilmainen toimitus", "code":"VNKJDO0987" },
  { "label":"Muistikortit ja muistitikut puoleen hintaan", "code":"IOSDFJ872" },
  { "label":"Geforce näytönohjaimet -30%", "code":"KLHJ8976" },
  { "label":"Samsung 55'' televisio 399€", "code":"SDFJKL9080" },
  { "label":"Robottipölynimuri 129€", "code":"PQWO23894" },
  { "label":"Verkkotuotteet -40%", "code":"Doe" },
  { "label":"1Tb SSD 49€", "code":"Doe" },
  { "label":"Intel tuotteet -22%", "code":"Doe" },
  { "label":"AMD 6600XT 249€", "code":"Doe" }  
]
};*/

const openDoor =(path, event, doorDay) => {
     let today = new Date();
    let daynow = today.getDate();
    let monthnow = today.getMonth();

    if (monthnow!==11) {
        alert("This feature opens in December."); 
        return; 
}
if (daynow < doorDay) {
    alert (`This door cannot be opened until December ${doorDay}.`);
    return;

}
    event.target.parentNode.style.backgroundImage = `url(${path})`;
    
};

const createCalendar = () => {
    for(let i = 0; i  < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        const calendarDoorText = document.createElement("div");

        calendarDoor.classList.add("image");
        calendarDoor.style.gridArea = "door" + (i + 1);
        calendarContainer.appendChild(calendarDoor);

        calendarDoorText.classList.add("text");
        calendarDoorText.innerHTML = i + 1;
        calendarDoor.appendChild(calendarDoorText);
        courseNumber = i + 1;
        let coursePath = `http://annikagronqvist.free.nf/Uppg3/img/bild-1.jpg`;
        // let coursePath = `./courses/course-${courseNumber}.jpg`;

        calendarDoor.addEventListener("click", openDoor.bind(null, coursePath));

    }
};

calendarButton.addEventListener("click", createCalendar);
