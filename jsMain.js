document.querySelector(".submit-button").addEventListener( "click" , ()=> {
    let Home = document.querySelector("#odd1").value; 
    let Draw = document.querySelector("#odd2").value; 
    let Away = document.querySelector("#odd3").value;
     

    let result =   checkValidInputs(Home, Draw, Away); 
     if(result) {
            checkIfCoverAvail(Home, Draw , Away); 
     }
      
})

function checkIfCoverAvail(Home, Draw, Away){
    let resultsElem = document.querySelector(".results-parent");
      let arbPercentage = ((1/Home) + (1/Draw) + (1/Away)) * 100; 
    let msg = `
              <div class="results-display">
                         <h4>${arbPercentage.toFixed(2)} %</h4>
                         <h3>No Arbitrage Available</h3>
              </div>
             `
      if(arbPercentage < 100){
        console.log(arbPercentage); 
        msg = `
              <div class="results-display">
                         <h4>${arbPercentage.toFixed(2)} %</h4>
                         <h3 style="color:green;">Arbitrage Available</h3>
              </div>
             `
      }
       resultsElem.innerHTML = msg; 
}

function checkValidInputs(val1 , val2 , val3){
    if( isNaN(val1) || isNaN(val2) || isNaN(val3)){
        alert("Please enter a real number") ;
        return false; 
    } else if ( val1 == "" || val2 == "" || val3 == ""){
        alert("Enter a number ")
        return false; 
    }
    return true; 
}