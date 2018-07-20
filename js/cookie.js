

const updateCookie = () =>{
    document.cookie = `found=${found}`;
}

const deleteCookie = () =>{
    document.cookie = "found=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

const readCookie = () => {
    let cookieResults = document.cookie;
    if(cookieResults){
        let cookiefound = cookieResults.split('=')[1].split(',');
        cookiefound.forEach(element => {
            
            simulateClick(element);
            
        });
    }
   
}

const simulateClick = (ID)=> {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    const cb = document.getElementById(ID); 
    cb.dispatchEvent(event);
    
  }

  //checks cookie on page load
  document.addEventListener('DOMContentLoaded', function() {
    readCookie()
 }, false);
  
