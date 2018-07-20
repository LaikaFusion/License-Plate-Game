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
        this.found = false;
        console.log(this.element);
    }
        
    seenToggle(){
        debugger;
        if(this.seen){
            this.seen = false;
            if(document.getElementById(`${this.abbreviation}`).classList.contains('found')){
                document.getElementById(`${this.abbreviation}`).classList.remove('found');
            }
            
        }
        else{
            this.seen = true;
            document.getElementById(`${this.abbreviation}`).classList.add('found');
        }
    }
    createCard(){
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