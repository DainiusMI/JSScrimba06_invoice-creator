// DOM element list
const serviceOptionList = document.getElementById('service-options');
const selectedServiceList = document.getElementById('selected-services');
const paymentOptionsEl = document.getElementById('payment-info');
const finalBillEl = document.getElementById('bill');
const sendInvoice = document.getElementById('invoice-button');

// information arrays
const serviceOptionsArray = [
    { name: 'Wash Car',     price: 10},
    { name: 'Mow Lawn',     price: 20},
    { name: 'Pull Weeds',   price: 30}
];
const paymentOptionsArray = ['cash', 'credit card', 'PayPal'];
let orderedServicesArray = [];

let bill = 0;

// generate html code for option list DOM elements
function renderServiceOptionList() {
    let serviceOptionListDOM = '';
    for (let i = 0; i < serviceOptionsArray.length; i++){
        serviceOptionListDOM += `
            <button value='${i}' class='button service-button'>
                ${serviceOptionsArray[i].name}\: \$${serviceOptionsArray[i].price}
            </button>
        `;
    }
    serviceOptionList.innerHTML = serviceOptionListDOM;
}
renderServiceOptionList();

// generating payment options string
function renderPaymentMethods(){
    let paymentOptionsString = '';
    for (let i = 0; i < paymentOptionsArray.length; i++){
        if (i === paymentOptionsArray.length-1) {
            paymentOptionsString += 'or ' + paymentOptionsArray[i];
        }
        else {
        paymentOptionsString += paymentOptionsArray[i] + ', ';
        }
    }
    paymentOptionsEl.innerHTML = `We accept ${paymentOptionsString}`;
}
renderPaymentMethods()

// adding ordered services to an array
const serviceButtonGroup = document.querySelectorAll('.service-button');
serviceButtonGroup.forEach(function (i) {
    i.addEventListener('click', function (){
        let nameKey = serviceOptionsArray[i.value];
        // checking if selected service was not already ordered
        if (orderedServicesArray.includes(nameKey) == false){
            orderedServicesArray.push(serviceOptionsArray[i.value]);
        }
        renderOrderedServices();
        sumOrder()
        finalBillEl.textContent ='\$' + bill;
    })
})

// render selected services into a list
function renderOrderedServices(){
    let selectedServiceListDOM = '';
    for (let i = 0; i < orderedServicesArray.length; i++){
        selectedServiceListDOM += `
            <div class='selected-services-row'>
                <div class='service-name-container'>
                    <h3>${orderedServicesArray[i].name}</h3>
                    <p class='remove-button'>remove</p>
                </div>
                <p class='service-cost'><span>$</span>${orderedServicesArray[i].price}</p>
            </div>
        `;
    }
    selectedServiceList.innerHTML = selectedServiceListDOM;
}

// sum the price of selected services
function sumOrder() {
    let sum = 0;
    for (let i = 0; i < orderedServicesArray.length; i++){
        sum += orderedServicesArray[i].price;
    }
    console.log(sum);
    bill = sum;
}

// button that resets entered selected values
sendInvoice.addEventListener('click', function(){
    orderedServicesArray = [];
    bill = 0;
    finalBillEl.textContent = '';
    renderOrderedServices();
})

const removeButtonEl = document.querySelectorAll('.remove-button');
console.log(removeButton)
removeButtonEl.forEach(function (i) {
    i.addEventListener('click', function (){
        //orderedServicesArray.push(serviceOptionsArray[i.value]);
        console.log('bam');
       
    })
})

