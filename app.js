const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdown = document.querySelectorAll(".dropdown select")
const button = document.querySelector('form button')
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')

for (let select of dropdown){
    for(currency in countryList){
        let newopt = document.createElement("option")
        newopt.innerText = currency;
        newopt.value = currency;
        if(select.name === 'from' && currency === 'USD'){
            newopt.selected = "selected"
        }else if(select.name === 'to' && currency === 'INR'){
            newopt.selected = "selected"    
        }
        select.append(newopt);
        select.addEventListener('change', (evt)=>{
            updateFlag(evt.target)
        })
    }
}

const updateFlag =(element)=>{
    let currency = element.value
    let countryCode = countryList[currency]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

button.addEventListener('click', async (evt)=>{
    evt.preventDefault()
    let amount = document.querySelector('.amount input')
    let amtValue = amount.value;
    if(amtValue === "" || amtValue< 0){
        amtValue= 1;
        amount.value = "1"
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate =  data[toCurr.value.toLowerCase()];
    let finalAmount = amtValue * rate
    console.log(finalAmount);
    console.log();
    msg.innerText= `${amtValue}${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})