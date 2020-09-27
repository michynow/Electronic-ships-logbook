//Set ship header and type

const shipDetailsBtn = document.querySelector('.ship-details__button');
const shipDetailsClosingBtn = document.querySelector('#ship-details__popup-closing-btn');
const shipDetailsPopUp = document.querySelector('.ship-details__popup');
const shipTypeSpan = document.querySelector('#ship-type-span');
const shipNameSpan = document.querySelector('#ship-name-span');

//opening of a form
shipDetailsBtn.addEventListener('click', () => {
    shipDetailsPopUp.style.visibility = "visible";
    disableButtons();
})
//disabling of button operation when popup is open;
function disableButtons() {
    voyageDetailsBtn.disabled = true;
    newRecordBtn.disabled = true;
    shipDetailsBtn.disabled = true;
}

function enableButtons() {
    voyageDetailsBtn.disabled = false;
    newRecordBtn.disabled = false;
    shipDetailsBtn.disabled = false;
}
//closing of a form
shipDetailsClosingBtn.addEventListener('click', () => {
    shipDetailsPopUp.style.visibility = "hidden";
    enableButtons();
})

//pop up input selection
const shipTypeSelect = document.querySelector('#ship-type');
const shipDetailsPopUpSubmit = document.querySelector('#ship-details-submit-btn');

//Submitting of ship details
shipDetailsPopUpSubmit.addEventListener('click', () => {
    shipDetailsPopUp.style.visibility = "hidden";
    shipTypeSpan.textContent = shipTypeSelect.options[shipTypeSelect.selectedIndex].value + " ";
    shipNameSpan.textContent = document.querySelector('#ship-name-input').value;
    enableButtons();
    shipDetailsBtn.textContent = "Edit ship details";
})

//date and destination pop up form
const voyageDetailsBtn = document.querySelector('.voyage-details__button');
const voyageDetailsPopUp = document.querySelector('.voyage-details__popup');
const voyageDetailsClosingBtn = document.querySelector('#voyage-details__popup-closing-btn');
voyageDetailsBtn.addEventListener('click', () => {
    voyageDetailsPopUp.style.visibility = "visible";
    disableButtons();
})

//Update date and destination rows
const dateSpan = document.querySelector('#date-span');
const destinationSpanFrom = document.querySelector('#dest-span__from');
const destinationSpanTo = document.querySelector('#dest-span__to');
const voyageDetailsSubmit = document.querySelector('#voyage-details__submit-btn');
const destFromInput = document.querySelector('#ship-destination-input__from');
const destToInput = document.querySelector('#ship-destination-input__to');
voyageDetailsSubmit.addEventListener('click', () => {
    dateSpan.textContent = " " + document.querySelector('#date-input').value;
    //prevent empty inputs on destination form
    if (destFromInput.value !== "" || destToInput.value !== "") {
        destinationSpanFrom.textContent = " " + destFromInput.value + ' to: ';
        destinationSpanTo.textContent = destToInput.value;
        voyageDetailsBtn.textContent = "Edit date and destination";
        voyageDetailsPopUp.style.visibility = "hidden";
        enableButtons();
    } else {
        alert('Please fill in voyage details!');
    }

})
//closing of a voyage details pop up
voyageDetailsClosingBtn.addEventListener('click', () => {
    voyageDetailsPopUp.style.visibility = "hidden";
    enableButtons();
})
//add new data pop up opening / closing
const newRecordBtn = document.querySelector('.new-record__btn');
const newRecordPopUp = document.querySelector('.new-record__popup');
const newRecordSubmitBtn = document.querySelector('#new-record__submit-btn');
const recordTable = document.querySelector('.records-table__tbody');
newRecordBtn.addEventListener('click', openNewRecordPopup);

function openNewRecordPopup() {
    newRecordPopUp.style.visibility = "visible";
    disableButtons();
}
//buttons near inputs added to add special marks
const latDegBtn = document.querySelector('.new-record__lat-deg-btn');
let longitudeInput = document.querySelector('#new-record__longitude');
let latitudeInput = document.querySelector('#new-record__latitude');
const longDegBtn = document.querySelector('.new-record__long-deg-btn');
const latMinBtn = document.querySelector('.new-record__lat-min-btn');
const longMinBtn = document.querySelector('.new-record__long-min-btn');
latDegBtn.addEventListener('click', () => {
    latitudeInput.value += '\xB0' + " "
    latitudeInput.focus();
});
latMinBtn.addEventListener('click', () => {
    latitudeInput.value += '\''; - +
    latitudeInput.focus();
});

longDegBtn.addEventListener('click', () => {
    longitudeInput.value += '\xB0' + " "
    longitudeInput.focus();
})
longMinBtn.addEventListener('click', () => {
    longitudeInput.value += '\''
    longitudeInput.focus();
})
const newRecordClosingBtn = document.querySelector('#new-record__popup-closing-btn');

function closeNewRecordPopup() {
    newRecordPopUp.style.visibility = "hidden";
    enableButtons();
    clearInputs();
}
newRecordClosingBtn.addEventListener('click', closeNewRecordPopup);

// store input values in an array, then pass it to  all created td's
let newRecordInputs = document.querySelectorAll('.new-record__popup input');
let remarks = document.querySelector('textarea');

function clearInputs() {
    for (let i = 0; i < newRecordInputs.length; i++) {
        newRecordInputs[i].value = "";
        remarks.value = "";
    };
}

newRecordSubmitBtn.addEventListener('click', addRecord);
//class constructor for each table row
class Record {
    constructor(time, latitude, longitude, heading, speed, wind, sea, visibility, remarks) {
        this.time = time;
        this.latitude = latitude;
        this.longitude = longitude;
        this.heading = heading;
        this.speed = speed;
        this.wind = wind;
        this.sea = sea;
        this.visibility = visibility
        this.remarks = remarks;
        this.addRow();
    }
}

//set id for each row
let idContainer = 0;
Record.prototype.addRow = function () {
    let newLog = document.createElement('tr');
    newLog.setAttribute('id', idContainer);
    idContainer++;
    recordTable.appendChild(newLog);
    //store values and add them to each td 
    let valueStorage = [this.time, this.latitude, this.longitude, this.heading,
        this.speed, this.wind, this.sea, this.visibility, this.remarks
    ];
    for (let i = 0; i < 9; i++) {
        let tableData = document.createElement('td');
        newLog.appendChild(tableData);
        tableData.textContent = valueStorage[i];
    }
    //add 2 buttons - delete and edit
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'new-record__delete-row-btn')
    newLog.appendChild(deleteBtn);
    let editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'new-record__edit-row-btn')
    newLog.appendChild(editBtn);
    //adding functionality to edit/delete btns
    function editThisRow(e) {
        //on pop up display values from the edited row
        let popUpHeading = document.querySelector('.new-record__popup h2');
        let thisRow = e.target.parentNode;
        let editStorage = [];
        for (let i = 0; i < 9; i++) {
            editStorage.push(thisRow.childNodes[i].textContent);
        }
        editStorage[1] = editStorage[1].replace(/([A-Z])/, "");
        editStorage[2] = editStorage[2].replace(/([A-Z])/, "");
        editStorage[3] = editStorage[3].replace('\xB0', "");
        for (let i = 0; i < 8; i++) {
            newRecordInputs[i].value = editStorage[i];
        }
        remarks.value = editStorage[8];
        popUpHeading.textContent = 'Edit your record!'
        openNewRecordPopup();
        //adding event listener to the record edit button, so that it applies changes
        let oldRecordEditBtn = document.querySelector('#edit-record')
        let recordEditBtn = oldRecordEditBtn.cloneNode(true);
        oldRecordEditBtn.parentNode.replaceChild(recordEditBtn, oldRecordEditBtn);
        newRecordSubmitBtn.style.display = "none";
        recordEditBtn.style.display = "block";
        newRecordClosingBtn.addEventListener('click', () => {
            popUpHeading.textContent = 'Fill out inputs below to make a new record';
            newRecordSubmitBtn.style.display = "block";
            recordEditBtn.style.display = "none";
        })
        recordEditBtn.addEventListener('click', () => {
            let thisRowTds = thisRow.childNodes;
            for (let i = 0; i < 8; i++) {
                thisRowTds[i].textContent = newRecordInputs[i].value
            }
            //redeclaring N/S E/W selects for the scope of this function 
            let northOrSouthEdit = document.querySelector('.north-south');
            let eastOrWestEdit = document.querySelector('.east-west');
            thisRowTds[1].textContent += " " + northOrSouthEdit.options[northOrSouthEdit.selectedIndex].value;
            thisRowTds[2].textContent += " " + eastOrWestEdit.options[eastOrWestEdit.selectedIndex].value;
            thisRowTds[3].textContent += '\xB0';
            thisRowTds[8].textContent = remarks.value;
            closeNewRecordPopup();
            sortRecords();
            popUpHeading.textContent = 'Fill out inputs below to make a new record';
            newRecordSubmitBtn.style.display = "block";
            recordEditBtn.style.display = "none";
         
        })
    }
    //pop up with decision confirmation
    const confirmChoicePopUp = document.querySelector('.confirm-row-deletion-popup');
    const confirmChoiceBtn = document.querySelector('#confirm-row-deletion__btn--confirm');
    const cancelChoiceBtn = document.querySelector('#confirm-row-deletion__btn--cancel');
    deleteBtn.addEventListener('click', () => {
        confirmChoicePopUp.style.visibility = "visible";
        disableButtons();
        confirmChoiceBtn.addEventListener('click', () => {
            newLog.remove();
            confirmChoicePopUp.style.visibility = "hidden";
            enableButtons();
        })
        cancelChoiceBtn.addEventListener('click', () => {
            confirmChoicePopUp.style.visibility = "hidden";
            enableButtons();
        })
    })
    editBtn.addEventListener('click', editThisRow);
}   
function addRecord() {
    //selecting all input values and storing them in an object
    let timeValue = document.querySelector('#new-record__UTC-time').value;
    let northOrSouth = document.querySelector('.north-south');
    let northOrSouthValue = northOrSouth.options[northOrSouth.selectedIndex].value;
    let latitudeValue = document.querySelector('#new-record__latitude').value + " " + northOrSouthValue;
    let eastOrWest = document.querySelector('.east-west');
    let eastOrWestValue = eastOrWest.options[eastOrWest.selectedIndex].value;
    let longitudeValue = document.querySelector('#new-record__longitude').value + " " + eastOrWestValue;
    let headingValue = document.querySelector('#new-record__heading').value + '\xB0';
    let speedValue = document.querySelector('#new-record__SOG').value;
    let windValue = document.querySelector('#new-record__wind-force').value;
    let seaValue = document.querySelector('#new-record__sea-state').value;
    let visibilityValue = document.querySelector('#new-record__visibility').value;
    let anotherRecord = new Record(timeValue, latitudeValue, longitudeValue,
        headingValue, speedValue, windValue, seaValue, visibilityValue, remarks.value);
    closeNewRecordPopup();
    clearInputs();
    sortRecords();
}
// function for sorting out table rows by time dynamically upon edit or new record
function sortRecords() {
    let rows, switching, i, x, y, shouldSwitch;
    switching = true
    while (switching) {
        switching = false;
        rows = recordTable.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];
            if (x.textContent > y.textContent) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
//clear page button
const clearAllRecords = document.querySelector('.clear-records__button');
const clearAllRecordsConfirmPopUp = document.querySelector('.confirm-table-clearing-popup');
const clearAllRecordsConfirmBtn = document.querySelector('#confirm-table-clearing__btn--confirm');
const clearAllRecordsCancelBtn = document.querySelector('#confirm-table-clearing__btn--cancel');
clearAllRecords.addEventListener('click', () => {
    disableButtons();
    clearAllRecordsConfirmPopUp.style.visibility = "visible";
    clearAllRecordsConfirmBtn.addEventListener('click', () => {
        recordTable.innerHTML = "";
        enableButtons();
        clearAllRecordsConfirmPopUp.style.visibility = "hidden";
    })
    clearAllRecordsCancelBtn.addEventListener('click', () => {
        enableButtons();
        clearAllRecordsConfirmPopUp.style.visibility = "hidden";
    })
});
//print or export to PDF with print.js
const makePDFBtn = document.querySelector('.export-button');
const tableContainer = document.querySelector('.records-table-container');
const tooltipContainer = document.querySelector('.table__wind-tooltip-container');
const editDeleteHeader = document.querySelector('.table__actions');
let hideEditButtons = document.getElementsByClassName('new-record__edit-row-btn');
let hideDeleteButtons = document.getElementsByClassName('new-record__delete-row-btn');
function exportToPDF(){ 
    tooltipContainer.style.display ='none';
    editDeleteHeader.textContent = 'Watchkeeper\'s signature';
    printJS({
        printable:"print",
        type:"html",
        css: '/styles.css',
        style:`.records-table-container{
            box-shadow:none;
        };
        .new-record__delete-row-btn,
        .new-record__edit-row-btn {
            color:transparent;
            text-shadow:0px 0px;
            visibility:hidden;
        }
        .new-record__edit-row-btn::after{
            content:" ";
            display:none;
        }
        .new-record__delete-row-btn::after{
            content: " ";
            display:none;
        }`
    });
    tooltipContainer.style.display ='inline';
    editDeleteHeader.textContent = 'Edit / delete record'
}
makePDFBtn.addEventListener('click',exportToPDF)

