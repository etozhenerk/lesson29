"use strict";

const inputs = document.querySelectorAll('.input');

inputs.forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[\+-\.;":'=!№%\?\*\(\)\{\[\]\}~@#\$\^&_><a-zA-Zа-яА-Я]/, '');
  });
});

const getData = (currency) => {
  return fetch(`https://api.exchangeratesapi.io/latest?base=${currency}`);
};



const addListeners = (idForm, currency) => {
  const form = document.querySelector(idForm);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input");
    const value = inputs[0].value;
  
    getData(currency)
      .then((data) => data.json())
      .then((data) => {
        if(currency === "RUB"){
          inputs[1].value = Math.floor(value * data.rates.USD * 100) / 100;
        }else if(currency === "USD"){
          inputs[1].value = Math.floor(value * data.rates.RUB * 100) / 100;
        }
        
      });
  });
};

addListeners('#form1', 'USD');
addListeners('#form2', 'RUB');