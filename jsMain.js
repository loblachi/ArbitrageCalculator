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
        <label><input type="radio"  name="strategy" value="home"> Home profit</label>
        <label><input type="radio"  name="strategy" value="away"> Away profit</label>
        <label><input type="radio"  name="strategy" value="draw"> Draw profit</label>  
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
    const amt = document.querySelector(".amount-input").value ;
    if (!amt || isNaN(amt) || amt.trim() === "") {
    console.log("Invalid input, exiting...");
    alert("Please enter a valid number")
    return; // 🚪 exit the function here
   }
    const selected = document.querySelector('input[name="strategy"]:checked').value;
    console.log(selected + " " + amt); 

    calculateProfit(amt , selected)
}
function calculateProfit(amt , radioSelected){
    let pHome  = parseFloat(document.querySelector("#odd1").value); 
    let pDraw  = parseFloat(document.querySelector("#odd2").value); 
    let pAway  = parseFloat(document.querySelector("#odd3").value);

    switch(radioSelected){
        case "equal" :
            pHome = 1 / parseFloat(pHome);
            pDraw = 1 / parseFloat(pDraw);
            pAway = 1 / parseFloat(pAway);
            const sum = pHome + pDraw + pAway;
             CalculateTargetProfit(amt , pHome , pDraw , pAway, "equal" , sum); 
        break;

        case "home" :
            CalculateTargetProfit(amt , pHome , pDraw , pAway, "home");
        break;

        case "away" : 
            CalculateTargetProfit(amt , pHome , pDraw , pAway, "away");
        break; 

        case "draw" :
            CalculateTargetProfit(amt , pHome , pDraw , pAway, "draw");
        break; 

        default:
            console.log("Unknown Strategy");
    }
}
function CalculateTargetProfit(totalAmount , pHome , pDraw , pAway , target , sum = 0){
    let profit = 0; 
    let stakeHome = 0; 
    let stakeDraw = 0; 
    let stakeAway = 0; 

    console.log("this is the sum for now : " + sum)
 // Calculate stakes for equal profit
   if(target === "equal"){
     stakeHome = totalAmount * (pHome / sum);
     stakeDraw = totalAmount * (pDraw / sum);
     stakeAway = totalAmount * (pAway / sum);

    // Calculate profit (same for all outcomes)
     profit = totalAmount * (1 / sum - 1);

   }
else if (target === "home") {
        stakeDraw = totalAmount / pDraw;
        stakeAway = totalAmount / pAway;
        stakeHome = totalAmount - (stakeDraw + stakeAway);
        profit = stakeHome * pHome - totalAmount;
    } else if (target === "draw") {
        stakeHome = totalAmount / pHome;
        stakeAway = totalAmount / pAway;
        stakeDraw = totalAmount - (stakeHome + stakeAway);
        profit = stakeDraw * pDraw - totalAmount;
    } else if (target === "away") {
        stakeHome = totalAmount / pHome;
        stakeDraw = totalAmount / pDraw;
        stakeAway = totalAmount - (stakeHome + stakeDraw);
        profit = stakeAway * pAway - totalAmount;
    }
 // yooooo testing this above
     function easeExpression(oddExpression){
       return target === "equal" ? 1/oddExpression : oddExpression ; 
     }
  let arrObj = [
    {
        name:"Home",
        odds: easeExpression(pHome) ,
        stake: stakeHome.toFixed(2),
        return: (stakeHome * easeExpression(pHome)).toFixed(2),
        profit: ((stakeHome * easeExpression(pHome)) - totalAmount).toFixed(2)
    },
    {
        name: "Away",
        odds: easeExpression(pAway),
        stake: stakeAway.toFixed(2),
        return: (stakeAway * easeExpression(pAway)).toFixed(2),
        profit: ((stakeAway * easeExpression(pAway)) - totalAmount).toFixed(2)
    },
    {
        name: "Draw",
        odds: easeExpression(pDraw),
        stake: stakeDraw.toFixed(2),
        return: (stakeDraw * easeExpression(pDraw)).toFixed(2),
        profit: ((stakeDraw * easeExpression(pDraw)) - totalAmount).toFixed(2)
    }
  ]
  let html_a = `
  <table class="table-info">
  <tr>
    <th>Odds</th>
    <th>Initial Stake</th>
    <th>Total Return</th>
    <th>Actual Profit(R)</th>
  </tr>
  ${iterateOver(arrObj , target)}
  </table>
  `; 

  document.querySelector("#result").innerHTML = html_a; 
}


function iterateOver(arrObj , target){
    let combinedHtml = `
    <div class="heading-display">
      <h3 style="text-transform:Uppercase;">${target} Profit</h3>
    </div>
    `; 
    arrObj.forEach( (obj) => {
       let singleHtml = `
        <tr>
            <td>${(obj.odds).toFixed(2)}</td>
            <td>${obj.stake}</td>
            <td>${obj.return}</td>
            <td class="profit-class">${obj.profit}</td>
        </tr>
        `; 
         combinedHtml += singleHtml; 
  })
  return combinedHtml; 
}
