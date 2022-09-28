let country_list = {
  "AED" : "AE","AFN" : "AF","XCD" : "AG","ALL" : "AL","AMD" : "AM","ANG" : "AN","AOA" : "AO","AQD" : "AQ","ARS" : "AR","AUD" : "AU","AZN" : "AZ","BAM" : "BA","BBD" : "BB","BDT" : "BD","XOF" : "BE","BGN" : "BG","BHD" : "BH","BIF" : "BI","BMD" : "BM","BND" : "BN","BOB" : "BO","BRL" : "BR","BSD" : "BS","NOK" : "BV","BWP" : "BW","BYR" : "BY","BZD" : "BZ","CAD" : "CA","CDF" : "CD","XAF" : "CF","CHF" : "CH","CLP" : "CL","CNY" : "CN","COP" : "CO","CRC" : "CR","CUP" : "CU","CVE" : "CV","CYP" : "CY","CZK" : "CZ","DJF" : "DJ","DKK" : "DK","DOP" : "DO","DZD" : "DZ","ECS" : "EC","EEK" : "EE","EGP" : "EG","ETB" : "ET","EUR" : "FR","FJD" : "FJ","FKP" : "FK","GBP" : "GB","GEL" : "GE","GGP" : "GG","GHS" : "GH","GIP" : "GI","GMD" : "GM","GNF" : "GN","GTQ" : "GT","GYD" : "GY","HKD" : "HK","HNL" : "HN","HRK" : "HR","HTG" : "HT","HUF" : "HU","IDR" : "ID","ILS" : "IL","INR" : "IN","IQD" : "IQ","IRR" : "IR","ISK" : "IS","JMD" : "JM","JOD" : "JO","JPY" : "JP","KES" : "KE","KGS" : "KG","KHR" : "KH","KMF" : "KM","KPW" : "KP","KRW" : "KR","KWD" : "KW","KYD" : "KY","KZT" : "KZ","LAK" : "LA","LBP" : "LB","LKR" : "LK","LRD" : "LR","LSL" : "LS","LTL" : "LT","LVL" : "LV","LYD" : "LY","MAD" : "MA","MDL" : "MD","MGA" : "MG","MKD" : "MK","MMK" : "MM","MNT" : "MN","MOP" : "MO","MRO" : "MR","MTL" : "MT","MUR" : "MU","MVR" : "MV","MWK" : "MW","MXN" : "MX","MYR" : "MY","MZN" : "MZ","NAD" : "NA","XPF" : "NC","NGN" : "NG","NIO" : "NI","NPR" : "NP","NZD" : "NZ","OMR" : "OM","PAB" : "PA","PEN" : "PE","PGK" : "PG","PHP" : "PH","PKR" : "PK","PLN" : "PL","PYG" : "PY","QAR" : "QA","RON" : "RO","RSD" : "RS","RUB" : "RU","RWF" : "RW","SAR" : "SA","SBD" : "SB","SCR" : "SC","SDG" : "SD","SEK" : "SE","SGD" : "SG","SKK" : "SK","SLL" : "SL","SOS" : "SO","SRD" : "SR","STD" : "ST","SVC" : "SV","SYP" : "SY","SZL" : "SZ","THB" : "TH","TJS" : "TJ","TMT" : "TM","TND" : "TN","TOP" : "TO","TRY" : "TR","TTD" : "TT","TWD" : "TW","TZS" : "TZ","UAH" : "UA", "UGX" : "UG","USD" : "US","UYU" : "UY","UZS" : "UZ", "VEF" : "VE", "VND" : "VN", "VUV" : "VU", "YER" : "YE", "ZAR" : "ZA", "ZMK" : "ZM","ZWD" : "ZW"
}
let button = document.querySelector("form button");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let dropList = document.querySelectorAll("select");
let selectone = document.querySelector(".one");
let selecttwo = document.querySelector(".two");
for(let i=0; i<dropList.length; i++){
  for(coun in country_list){
    let selected;
    if(i==0){
      selected = coun == "USD" ? "selected" : "";
    }else if(i==1){
      selected = coun == "EGP" ? "selected" : "";
    }
    let option = `<option value="${coun}">${coun}</option>`;
    selectone.insertAdjacentHTML("beforeend", option);
    selecttwo.insertAdjacentHTML("beforeend", option);
  }
  dropList[i].addEventListener("change", e => {
    loadFlag(e.target);
  })
}
function loadFlag(e){
  for(coun in country_list){
    if(coun == e.value){
      let imgTag = e.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/w40/${(country_list[coun]).toLowerCase()}.png`
    }
  }
}
window.addEventListener("load", () => {
  getEchangerRate();
})

button.addEventListener("click", e => {
  e.preventDefault();
  getEchangerRate();
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () =>{
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  getEchangerRate();
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
})

function getEchangerRate(){
  let amount = document.querySelector("input");
  let amountValue = amount.value;
  if(amountValue == "" || amountValue == "0"){
    amount.value = "1";
    amountValue = 1;
  }
  let exchangerRateResult = document.querySelector(".exchanger-rate");
  exchangerRateResult.innerHTML = `Getting Exchanger Rate...`;
  let theUrl = `https://v6.exchangerate-api.com/v6/2e451a2a6b3e88d511a11d66/latest/${fromCurrency.value}`;
  fetch(theUrl).then(response => response.json()).then(result => {
    let exchangerate = result.conversion_rates[toCurrency.value];
    let TotalExchangerRate = (amountValue * exchangerate).toFixed(2);
    exchangerRateResult.innerHTML = `${amountValue} ${fromCurrency.value} = ${TotalExchangerRate} ${toCurrency.value}`
  }).catch(()=>{
    exchangerRateResult.innerHTML = "Something Went Wrong";
  });
}

