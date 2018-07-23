//document selectors
const licenesePlateArea = document.querySelector(".all-license-plates");
const filterButtons = document.querySelectorAll(".filterBtn");

//global variables

let totalScore = 0;
let found = [];
let animations = ["bounce","flash","pulse",	"rubberBand","shake","headShake","swing","tada","wobble","jello"]

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
        divConstr.className = "license-plate animated";
     
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
            this.randomAnimation();
        });
        licenesePlateArea.appendChild(divConstr);

    }
    randomAnimation(){
        const anToRun = animations[Math.floor(Math.random() * 10) ];
        const effectedElement = document.getElementById(`${this.abbreviation}`)
        effectedElement.classList.add(anToRun);

        setTimeout(function () {
            effectedElement.classList.remove(anToRun)
    
        }, 1000);
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
    updateCookie();
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
const searchFunction = () => {
    let searchInputField, searchInputFilter, stateCard, licensePlates, stateSpan;
    searchInputField = document.querySelector(".searchInputField");
    searchInputFilter = searchInputField.value.toLowerCase();
    stateCard = document.querySelector(".all-license-plates");
    licensePlates = stateCard.getElementsByTagName("div");

    for (let i = 0; i < licensePlates.length; i++) {
        stateSpan = licensePlates[i].querySelector("span");
        console.log(stateSpan)
        if (stateSpan.innerHTML.toLowerCase().indexOf(searchInputFilter) === 0) {
            licensePlates[i].style.display = "";
        } else {
            licensePlates[i].style.display = "none";
        }
    }
}


//listeners

for (let index = 0; index < filterButtons.length; index++) {
    filterButtons[index].addEventListener('click', () => { filterSeen(filterButtons[index].id)});
}


document.querySelector('#clearData').addEventListener('click', () => { deleteCookie()
    found = [];
    totalScore = 0;
    score(0);

    const foundPlatesArr  = document.querySelectorAll(".license-plate ");
    for (let i = 0; i < foundPlatesArr.length; i++) {
        if (foundPlatesArr[i].classList.contains("found") === true && document.querySelector('.selected').innerText ==='Found'  ){
            foundPlatesArr[i].classList.remove("found");
            foundPlatesArr[i].classList.add("hidden");
        }
        else if(foundPlatesArr[i].classList.contains("found") === true) {
            foundPlatesArr[i].classList.remove("found");
        }
    }
});
