//document selectors
const licenesePlateArea = document.querySelector(".all-license-plates");
const filterButtons = document.querySelectorAll(".filterBtn");

//classes
class PlateCard {
    constructor(element) {
        this.element = element;
        this.name = element.name;
        this.abbreviation = element.abbreviation;
        this.img = element.img;
        this.pointValue = element.pointValue;
        this.found = false;
    }

    seenToggle() {
        if (this.seen) {
            this.seen = false;
            if (document.getElementById(`${this.abbreviation}`).classList.contains('found')) {
                document.getElementById(`${this.abbreviation}`).classList.remove('found');
                score(-this.pointValue);

            }

        } else {
            this.seen = true;
            document.getElementById(`${this.abbreviation}`).classList.add('found');
            score(this.pointValue);
        }
    }
    createCard() {
        let divConstr = document.createElement("div");
        divConstr.className = "license-plate";
        divConstr.setAttribute('id', `${this.abbreviation}`);
        let titleSpan = document.createElement("span");
        titleSpan.className = "licenesePlateTitle";
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
let totalScore = 0;
const score = (pointValue) => {
    totalScore += pointValue;
    document.querySelector('.current-score').innerHTML = `${totalScore} / 50`;
}

const filterSeen = (whichFilter) =>{

    switch (whichFilter) {
        case Missing:
            
            break;
        
        case Found:
            const foundPlates  = document.querySelectorAll(".license-plate ");
            foundPlates.forEach;
            for (let index = 0; index < foundPlates.length; index++) {
                if(foundPlates[index].classList.contains('found') !== true){
                    foundPlates[index].classList.add('hidden');

                }
                
            }
            break;
        default:
            console.log('Something went wrong');
            break;
    }


}

//listeners 

for (let index = 0; index < filterButtons.length; index++) {
    filterButtons[index].addEventListener('click', () => { filterSeen(filterButtons[index].id)});
    
}