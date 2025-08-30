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
       displayInputAmounts(arbPercentage);
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

function displayInputAmounts(perc){
    let html; 
    if( perc < 100){ 
      html = 
    `
    <input type="number"class="amount-input" id="stakeInput" placeholder="Enter total stake (Rands)">

    <div class="radio-div">
        <label><input type="radio" name="strategy" value="equal" checked> Equal profit</label>
        <label><input type="radio" name="strategy" value="home"> Home profit</label>
        <label><input type="radio" name="strategy" value="away"> Away profit</label>
        <label><input type="radio" name="strategy" value="draw"> Draw profit</label>  
    </div>

    <button id="calculateBtn" class="calculateBtn">Calculate Bets</button>

    <div id="result"></div>
    `; 
    document.querySelector(".section-two-flex").innerHTML = html;
    document.querySelector("#calculateBtn").addEventListener("click" , () => {
    verifyTotalAmount();  
    });
    } else {
       html = ``; 
       document.querySelector(".section-two-flex").innerHTML = html;
    }
}

function verifyTotalAmount(){
    const selected = document.querySelector('input[name="strategy"]:checked').value;
    const amt = document.querySelector(".amount-input").value ;
    console.log(selected + " " + amt); 

    calculateProfit(amt , selected)
}
function calculateProfit(amt , radioSelected){
    let homeOdd  = document.querySelector("#odd1").value; 
    let drawOdd  = document.querySelector("#odd2").value; 
    let awayOdd  = document.querySelector("#odd3").value;

    const pHome = 1 / homeOdd;
    const pDraw = 1 / drawOdd;
    const pAway = 1 / awayOdd;

    const sum = pHome + pDraw + pAway;

    switch(radioSelected){
        case "equal" :
             calculateEqualProfit(amt , pHome , pDraw , pAway, sum); 
        break;

        case "home" :

        break;

        case "away" : 

        break; 

        case "draw" :

        break; 

        default:
            console.log("Unknown Strategy");
    }
}
function calculateEqualProfit(totalAmount , pHome , pDraw , pAway , sum){
 // Calculate stakes for equal profit
  const stakeHome = totalAmount * (pHome / sum);
  const stakeDraw = totalAmount * (pDraw / sum);
  const stakeAway = totalAmount * (pAway / sum);

  // Calculate profit (same for all outcomes)
  const profit = totalAmount * (1 / sum - 1);
  let arrObj = [
    {
        odds: 1/pHome,
        stake: stakeHome.toFixed(2),
        return: (stakeHome * (1/pHome)).toFixed(2),
        profit: ((stakeHome * (1/pHome)) - totalAmount).toFixed(2)
    },
    {
        odds: 1/pAway,
        stake: stakeAway.toFixed(2),
        return: (stakeAway * (1/pAway)).toFixed(2),
        profit: ((stakeAway * (1/pAway)) - totalAmount).toFixed(2)
    },
    {
        odds: 1/pDraw,
        stake: stakeDraw.toFixed(2),
        return: (stakeDraw * (1/pDraw)).toFixed(2),
        profit: ((stakeDraw * (1/pDraw)) - totalAmount).toFixed(2)
    }
  ]
  let html_a = `
  <table class="table-info">
  <tr>
    <th>Odds</th>
    <th>Initial Stake</th>
    <th>Total Return</th>
    <th>Actual Profit</th>
  </tr>
  ${iterateOver(arrObj)}
  </table>
  `
  console.log(html_a); 
  document.querySelector("#result").innerHTML = html_a; 
}


function iterateOver(arrObj){
    let combinedHtml = ''; 
    arrObj.forEach( (obj) => {
       let singleHtml = `
        <tr>
            <td>${obj.odds}</td>
            <td>${obj.stake}</td>
            <td>${obj.return}</td>
            <td>${obj.profit}</td>
        </tr>
        `; 
         combinedHtml += singleHtml; 
  })
  return combinedHtml; 
}







/* 
| Outcome (Odds)   |  Stake (R) |   Return (R) |  Profit (R) |
| ---------------- | ---------: | -----------: | ----------: |
| Tottenham (2.20) | **500.00** | **1,100.00** | **+207.78** |
| Other (4.30)     |     207.49 |       892.22 |        0.00 |
| Other (4.83)     |     184.72 |       892.22 |        0.00 |
*/ 