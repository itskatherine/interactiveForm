let otherJobInput = document.getElementById("other-title");
otherJobInput.style.display = "none";

let titleSelect = document.getElementById("title");

titleSelect.addEventListener("click", () => {
  if (titleSelect.value == "other") {
    otherJobInput.style.display = "block";
  } else {
    otherJobInput.style.display = "none";
  }
});

//Colour field initially invisible and field reads "Please select a colour"
function initialiseColorSelect() {
  let colorSelect = document.querySelector("select#color");
  colorSelect.style.display = "none";
  let colorLabelSelect = document.querySelector("label[for='color']");
  colorLabelSelect.innerHTML = "Please select a t-shirt theme";
}

//add click event to the design select
//which reveals the color option
let designSelect = document.querySelector("select#design");

designSelect.addEventListener("click", () => {
  hideOrShow("select#color", "block");
  let colorSelect = document.querySelector("select#color");
  let colorLabelSelect = document.querySelector("label[for='color']");
  colorLabelSelect.innerHTML = "Color:";

  if (designSelect.value == "js puns") {
    //Show the relevant items
    hideOrShow("option[value ='cornflowerblue']", "block");
    hideOrShow("option[value ='darkslategrey']", "block");
    hideOrShow("option[value ='gold']", "block");
    //Hide irrelevant ones
    hideOrShow("option[value ='tomato']", "none");
    hideOrShow("option[value ='steelblue']", "none");
    hideOrShow("option[value ='dimgrey']", "none");
    colorSelect.value = "";
  } else if (designSelect.value == "heart js") {
    //Show the relevant items
    hideOrShow("option[value ='tomato']", "block");
    hideOrShow("option[value ='steelblue']", "block");
    hideOrShow("option[value ='dimgrey']", "block");
    //Hide irrelevant ones
    hideOrShow("option[value ='cornflowerblue']", "none");
    hideOrShow("option[value ='darkslategrey']", "none");
    hideOrShow("option[value ='gold']", "none");
    colorSelect.value = "";
  } else {
    hideOrShow("select#color", "none");
    let colorLabelSelect = document.querySelector("label[for='color']");
    colorLabelSelect.innerHTML = "Please select a t-shirt theme";
  }
});

function hideOrShow(selectorValue, displayValue) {
  document.querySelector(selectorValue).style.display = displayValue;
}

let activities = document.querySelector(".activities");
let cost = document.createElement("p");
activities.appendChild(cost);

activities.addEventListener("click", () => {
  //maybe generate this array
  nameArray = [
    "all",
    "js-frameworks",
    "js-libs",
    "express",
    "node",
    "build-tools",
    "npm",
  ];

  let checkedCostDataName = [];

  //this loop creates an array of 4-part arrays which contain data about each
  //activity
  for (let i = 0; i < nameArray.length; i++) {
    let nameString = "input[name = '" + nameArray[i] + "']";
    //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    checkedCostDataName.push([
      document.querySelector(nameString).checked,
      parseInt(document.querySelector(nameString).dataset.cost),
      document.querySelector(nameString).dataset.dayAndTime,
      nameString,
    ]);
  }

  //this enables and disables clashing selected events
  //it misses out the first event because it doesn't have any time restrictions (i=1)
  for (let i = 1; i < checkedCostDataName.length; i++) {
    for (let j = 0; j < checkedCostDataName.length; j++) {
      if (
        checkedCostDataName[i][0] &&
        checkedCostDataName[i][2] === checkedCostDataName[j][2] &&
        document.querySelector(checkedCostDataName[j][3]).parentElement
          .className != "disabled" &&
        i != j
      ) {
        document.querySelector(
          checkedCostDataName[j][3]
        ).parentElement.className = "disabled";
        document.querySelector(checkedCostDataName[j][3]).disabled = true;
      } else if (
        !checkedCostDataName[i][0] &&
        checkedCostDataName[i][2] === checkedCostDataName[j][2] &&
        document.querySelector(checkedCostDataName[j][3]).parentElement
          .className == "disabled" &&
        i != j
      ) {
        document.querySelector(
          checkedCostDataName[j][3]
        ).parentElement.className = "enabled";
        document.querySelector(checkedCostDataName[j][3]).disabled = false;
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < checkedCostDataName.length; i++) {
    if (checkedCostDataName[i][0]) {
      sum += checkedCostDataName[i][1];
    }
  }

  //display the accumulated sum
  cost.innerHTML = "Total: $" + sum;
  validateActivities(sum);
});

let paymentMethodInput = document.querySelector("select#payment");
let creditCardOption = document.querySelector("option[value='credit card']");
creditCardOption.selected = "selected";
paymentMethodInput.value = "credit card";

//Payment info section
function setPaymentOption(creditCard, paypal, bitcoin) {
  hideOrShow("#credit-card", creditCard);
  hideOrShow("#paypal", paypal);
  hideOrShow("#bitcoin", bitcoin);
}

paymentMethodInput.addEventListener("click", () => {
  if (paymentMethodInput.value == "credit card") {
    setPaymentOption("block", "none", "none");
  } else if (paymentMethodInput.value == "paypal") {
    setPaymentOption("none", "block", "none");
  } else if (paymentMethodInput.value == "bitcoin") {
    setPaymentOption("none", "none", "block");
  } else if (paymentMethodInput.value == "select method") {
    setPaymentOption("none", "none", "none");
  }
  validatePaymentDetails();
});

let submit = document.querySelector("button[type = 'submit']");

submit.addEventListener("click", (e) => {
  e.preventDefault(); // stops the page refreshing
  validateBasicInfo();
  // validateActivities();
  validatePaymentDetails();
});

//Create the error messages spaces

let errorMessageBasicInfo = document.createElement("p");
errorMessageBasicInfo.className = "error";
let basicDetails = document.querySelector("fieldset");
basicDetails.appendChild(errorMessageBasicInfo);

let errorMessageActivities = document.createElement("p");
errorMessageActivities.className = "error";
//let activities = document.getElementById("activities");
activities.appendChild(errorMessageActivities);

let paymentInfo = document.getElementById("paymentinfo");
let errorMessagePaymentInfo = document.createElement("p");
errorMessagePaymentInfo.className = "error";
paymentInfo.appendChild(errorMessagePaymentInfo);

function validateBasicInfo() {
  let errorText = "";

  let name = document.getElementById("name");
  let email = document.getElementById("mail");

  const emailRegex = /^([\w_\.-]+)@([\w\.-]+)\.([a-z\.]{2,5})$/;
  //This regex was altered slightly from expression in this RegEx manual: source https://www.keycdn.com/support/regex-cheatsheet
  if (!name.value) {
    errorText += "A man needs a name <br>";
    name.className = "invalid";
  } else {
    name.className = "valid";
  }
  if (!email.value.match(emailRegex)) {
    errorText += "Please enter a valid email address <br>";
    email.className = "invalid";
  } else {
    email.className = "valid";
  }
  errorMessageBasicInfo.innerHTML = errorText;
}

function validateActivities(sum) {
  let errorText = "";
  let pass = true;
  if (sum === 0) {
    errorText = "Please choose at least one activity";
    pass = false;
  }
  errorMessageActivities.innerHTML = errorText;
  return pass;
}

const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

ccNum.addEventListener("keyup", validatePaymentDetails);
zip.addEventListener("keyup", validatePaymentDetails);
cvv.addEventListener("keyup", validatePaymentDetails);

function validatePaymentDetails() {
  let errorText = "";
  if (paymentMethodInput.value === "credit card") {
    //ccNum.className = !ccNum.value ? "invalid" : "valid";
    const numberOfDigitsCCRegex = /^[0-9]{13,16}$/;
    if (numberOfDigitsCCRegex.test(ccNum.value)) {
      ccNum.className = "valid";
    } else {
      ccNum.className = "invalid";
      errorText +=
        "Card number: Please enter a number between 13-16 characters <br>";
    }
    const zipRegex = /^[0-9]{5}$/;

    if (zipRegex.test(zip.value)) {
      zip.className = "valid";
    } else {
      zip.className = "invalid";
      errorText += "ZIP value: Please enter a ZIP code 5 digits long.<br>";
    }

    const cvvRegex = /^[0-9]{3}$/;

    if (cvvRegex.test(cvv.value)) {
      cvv.className = "valid";
    } else {
      cvv.className = "invalid";
      errorText += "CVV: Please enter a 3 digit CVV code. <br>";
    }
  } else {
    errorText = "";
  }
  errorMessagePaymentInfo.innerHTML = errorText;
}

setPaymentOption("block", "none", "none");
initialiseColorSelect();
