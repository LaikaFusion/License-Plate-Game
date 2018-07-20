//document selectors
const licenesePlateArea = document.querySelector(".all-license-plates");

//classes
class PlateCard{
    constructor(element){
        this.element = element;
        this.name = element.name;
        this.abbreviation = element.abbreviation;
        this.img = element.img;
        this.pointValue = element.pointValue;
        this.seen = false;
    }
    seenToggle(){
        if(this.seen){
            this.seen = false;
        }
        else{
            this.seen = true;
        }
    }
    createCard(){
        let divConstr = document.createElement("div");
        divConstr.className = "license-plate";
        let titleSpan = document.createElement("span");
        titleSpan.className = "licenesePlateTitle";
        titleSpan.textContent = `${this.name}`
        divConstr.appendChild(titleSpan);
        let plateImg = document.createElement("IMG");
        plateImg.className = "plateImage";
        plateImg.setAttribute('src', `${this.img}`);
        divConstr.appendChild(plateImg);
        licenesePlateArea.appendChild(divConstr);
    }

}

