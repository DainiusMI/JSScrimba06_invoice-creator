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

// generate html DOM elements code for option list 
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


let serviceOrderList = [];
// adding ordered services to an array
const serviceButtonGroup = document.querySelectorAll('.service-button');
serviceButtonGroup.forEach(function (i) {
    i.addEventListener('click', function (){
        this.classList.add('service-is-selected');
        let nameKey = serviceOptionsArray[i.value];
        // checking if selected service was not already ordered
        if (orderedServicesArray.includes(nameKey) == false){
            orderedServicesArray.push(serviceOptionsArray[i.value]);
            serviceOrderList.push(i.value);
        }
        runApp();
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
                    <p value='${i}' class='remove-button'>remove</p>
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
    bill = sum;
}

// button that resets entered selected values
sendInvoice.addEventListener('click', function(){
    orderedServicesArray = [];
    bill = 0;
    finalBillEl.textContent = '';
    for (let i= 0; i < serviceButtonGroup.length; i++) {
        serviceButtonGroup[i].classList.remove('service-is-selected');
    }
    renderOrderedServices();
})

// following DOM changes in  selected services list
let removeButtonElArray = [];
const config = {
  attributes: true, 
  childList: true, 
  characterData: true
};
  
const callback = mutations => {  
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      removeButtonElArray = document.querySelectorAll('.remove-button');

    }
// removing ordered services from the list
    removeButtonElArray.forEach(function (i) {
        i.addEventListener('click', function (){
            let index = this.getAttribute('value');
            orderedServicesArray.splice(index, 1);
            serviceButtonGroup[serviceOrderList[index]].classList.remove('service-is-selected');
            serviceOrderList.splice(index, 1)
            runApp();
        })
    })
  });
}

const observer = new MutationObserver(callback);
observer.observe(selectedServiceList, config);

function runApp() {
    renderOrderedServices();
    sumOrder()
    finalBillEl.textContent ='\$' + bill;
}