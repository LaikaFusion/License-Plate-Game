//document selectors
const licenesePlateArea = document.querySelector(".all-license-plates");
const filterButtons = document.querySelectorAll(".filterBtn");


//global variables

let totalScore = 0;
let found = [];

//classes
class PlateCard {
    constructor(element) {
        this.element = element;
        this.name = element.name;
        this.abbreviation = element.abbreviation;
        this.img = element.img;
        this.pointValue = element.pointValue;
    }

    seenToggle() {
        if (this.seen) {
            this.seen = false;
            if (document.getElementById(`${this.abbreviation}`).classList.contains('found')) {
                document.getElementById(`${this.abbreviation}`).classList.remove('found');
                score(-this.pointValue);
            }
                found.splice(found.indexOf(`${this.abbreviation}`), 1);

            filterSeen(document.querySelector(".selected").id);

        } else {
            this.seen = true;
            document.getElementById(`${this.abbreviation}`).classList.add('found');
            found.push(`${this.abbreviation}`);
            score(this.pointValue);
            filterSeen(document.querySelector(".selected").id);
        }
    }
    createCard() {
        let divConstr = document.createElement("div");
        divConstr.className = "license-plate";
        divConstr.setAttribute('id', `${this.abbreviation}`);
        let titleSpan = document.createElement("span");
        titleSpan.className = "licensePlateTitle";
        titleSpan.textContent = `${this.name}`
        divConstr.appendChild(titleSpan);
        let plateImg = document.createElement("IMG");
        plateImg.className = "plateImage";
        plateImg.setAttribute('src', `${this.img}`);
        divConstr.appendChild(plateImg);
        divConstr.addEventListener('click', () => {
            this.seenToggle();
        });
        licenesePlateArea.appendChild(divConstr);

    }

}

plates.forEach(element => {
    const plate = new PlateCard(element);
    plate.createCard();
});


//functions

//score system
const score = (pointValue) => {
    totalScore += pointValue;
    document.querySelector('.current-score').innerHTML = `${totalScore} / 50`;
}

const filterSeen = (whichFilter) =>{
    const foundPlates  = document.querySelectorAll(".license-plate ");
    for (let index = 0; index < filterButtons.length; index++) {
       filterButtons[index].classList.remove('selected');

    }
    document.querySelector(`#${whichFilter}`).classList.add('selected');
    switch (whichFilter) {
        case "Missing":

        for (let index = 0; index < foundPlates.length; index++) {
            if(foundPlates[index].classList.contains('found')){
                foundPlates[index].classList.add('hidden');
            }
            else{
                foundPlates[index].classList.remove('hidden');
            }
        }
            break;

        case "Found":

            for (let index = 0; index < foundPlates.length; index++) {
                if(foundPlates[index].classList.contains('found') !== true){
                    foundPlates[index].classList.add('hidden');
                }
                else{
                    foundPlates[index].classList.remove('hidden');
                }
            }
            break;
        default:
        for (let index = 0; index < foundPlates.length; index++) {
            foundPlates[index].classList.remove('hidden');
        }
            break;
    }


}
//search system
// Search button needed for Event Listener
const searchButton = document.querySelector(".searchButton")
// Search input field to get text data they are searching for
const searchInputField = document.querySelector(".searchInputField")

// empty string containing our search data
let searchInputData = "";

searchButton.addEventListener("click", () => {
    //.value gets search input text that they've typed
    searchInputData = searchInputField.value;
    console.log(searchInputData);
})


//listeners

for (let index = 0; index < filterButtons.length; index++) {
    filterButtons[index].addEventListener('click', () => { filterSeen(filterButtons[index].id)});
}
