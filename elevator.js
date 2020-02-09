let elevatorA = {
    title: "A", currentFloorNr: 0, state: "no destination selected"
    , nextFloors: [], direction: "IDLE"
};
let elevatorB = {
    title: "B", currentFloorNr: 6, state: "no destination selected",
    nextFloors: [], direction: "IDLE"
};

function callElevator(startFloorNr) {
    if (Math.abs(elevatorA.currentFloorNr - startFloorNr) <=
        Math.abs(elevatorB.currentFloorNr) - startFloorNr) {
        elevatorA.state = "elevator called";
        return elevatorA;
    }
    else {
        elevatorB.state = "elevator called";
        return elevatorB;
    }
}

function addNextFloor(elevator, destinationFloorNr) {
    elevator.nextFloors.push(destinationFloorNr);
}

function getElevator() {
    let startFloorNr = document.getElementById("floor").getElementsByClassName("floorNumberId")[0].innerHTML.slice(-1)[0];
    let elevator = callElevator(startFloorNr);
    showElevator(elevator);
}

function moveElevator(startFloorNr, elevator) {
    elevator.state = "destination selected";
    if (elevator.nextFloors.length != 0) {
        for (destinationFloorNr of elevator.nextFloors) {
            if (destinationFloorNr >= elevator.currentFloorNr) { elevator.direction = "up"; } else { elevator.direction = "down"; };
            if (parseInt(startFloorNr) > parseInt(destinationFloorNr)) {
                let j = 1;
                for (let i = parseInt(startFloorNr); i >= parseInt(destinationFloorNr); i--) {
                    elevator.currentFloorNr = i;
                    setTimeout(() => {
                        showElevatorPosition(i);
                    }, j * 500);
                    j++;
                }
                setTimeout(() => {
                    elevator.state = "destination reached";
                    showElevator(elevator);
                }, j * 500);
            }
            else {
                let j = 1;
                for (let i = parseInt(startFloorNr); i <= parseInt(destinationFloorNr); i++) {
                    elevator.currentFloorNr = i;
                    setTimeout(() => {
                        showElevatorPosition(i);
                    }, j * 500);
                    j++;
                }
                setTimeout(() => {
                    elevator.state = "destination reached";
                    showElevator(elevator);
                }, j * 500);
            }
            elevator.nextFloors = elevator.nextFloors.slice(1);
        }
    }
}

function goToFloor(destinationFloorNr) {
    let startFloorNr = document.getElementById("floor").getElementsByClassName("floorNumberId")[0].innerHTML.slice(-1)[0];
    if (document.getElementById("elevator").getElementsByClassName("elevatorTitle")[0].innerHTML == "Elevator A") {
        elevator = elevatorA;
    }
    else elevator = elevatorB;

    addNextFloor(elevator, destinationFloorNr);
    showElevator(elevator);
    moveElevator(startFloorNr, elevator);
    showElevator(elevator);

    setTimeout(function () {
        hideElevator();
        showFloor(destinationFloorNr);    
    }, Math.abs(parseInt(destinationFloorNr) - parseInt(startFloorNr) + 1) * 500 + 2000);
}

function showFloor(number) {
    document.getElementById("floor").style.visibility = 'visible';
    document.getElementById("floor").getElementsByClassName("floorNumberId")[0].innerHTML = "Floor : " + number;
    let stateAString = `Elevator ${elevatorA.title} `;
    let stateBString = `Elevator ${elevatorB.title} `;
    if (elevatorA.direction == "up") {
        stateAString += "&#8593";
    }
    else if (elevatorA.direction == "down") {
        stateAString += "&#8595";
    }
    else stateAString += " ";
    if (elevatorB.direction == "up") {
        stateBString += "&#8593";
    }
    else if (elevatorB.direction == "down") {
        stateBString += "&#8595";
    }
    else stateBString += " ";
    document.getElementById("stateA").innerHTML = stateAString;
    document.getElementById("stateB").innerHTML = stateBString;
    hideElevator();
}

function showElevator(elevator) {
    document.getElementById("elevator").getElementsByClassName("elevatorTitle")[0].innerHTML = `Elevator ${elevator.title}`;
    document.getElementById("elevator").getElementsByClassName("elevatorState")[0].innerHTML = `STATUS: <b> ${elevator.state}</b>`;
    document.getElementById("floor").style.visibility = 'hidden';
    document.getElementById("elevator").style.visibility = 'visible';
}

//returns a pattern for a number between 0-9
function getPattern(nr) {
    nr = Number(nr);
    var pattern = ["yyyyyyx", "xyyxxxx", "yyxyyxy", "yyyyxxy", "xyyxxyy", "yxyyxyy", "yxyyyyy", "yyyxxxx", "yyyyyyy", "yyyyxyy", "xxxxxxx"];
    return pattern[nr];
}

function resetPanel() {
    let resetPattern = getPattern(10); //returns the 10th pattern in the list : xxxxxxx
    for (let i in resetPattern) {
        document.getElementById('segment' + i).className = resetPattern[i];
    }
}

//changes the class on the table for the necessary cells according to the pattern
function showElevatorPosition(nr) {
    resetPanel();
    let pattern = getPattern(nr);
    for (let i in pattern) {
        document.getElementById('segment' + i).className = pattern[i];
    }
}

function hideElevator() {
    resetPanel();
    document.getElementById("elevator").style.visibility = 'hidden';
}

function hideFloor() {
    document.getElementById("floor").style.visibility = 'hidden';
}

function hideFloorAndElevator() {
    hideFloor();
    hideElevator();
}