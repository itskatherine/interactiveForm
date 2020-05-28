//Activate autofocus on the name input
const nameInput = document.getElementById("name").focus();

//Append a cost element to the activities section to show an ongoing running total

const activities = document.querySelector(".activities");
const cost = document.createElement("p");
activities.appendChild(cost);

//Create the error messages spaces, <p>'s appended to the relevant fieldset
const errorMessageBasicInfo = document.createElement("p");
errorMessageBasicInfo.className = "error";
const basicDetails = document.querySelector("fieldset");
basicDetails.appendChild(errorMessageBasicInfo);

const errorMessageActivities = document.createElement("p");
errorMessageActivities.className = "error";
activities.appendChild(errorMessageActivities);

const paymentInfo = document.getElementById("paymentinfo");
const errorMessagePaymentInfo = document.createElement("p");
errorMessagePaymentInfo.className = "error";
paymentInfo.appendChild(errorMessagePaymentInfo);

//Select the other-title input and hide it until "other" is selected

const otherJobInput = document.getElementById("other-title");
otherJobInput.style.display = "none";

//Select the title select element and hide or display it depending on whether "other" has been selected
const titleSelect = document.getElementById("title");

//The submit button
const submit = document.querySelector("button[type = 'submit']");

//Select and initialise the credit card payment option as the selected value
const paymentMethodInput = document.querySelector("select#payment");
const creditCardOption = document.querySelector("option[value='credit card']");
creditCardOption.selected = "selected";
paymentMethodInput.value = "credit card";

//select the payment options ready to use later
const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

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

//Select and add click event to the design select
//which reveals the color options, depending on the theme
const designSelect = document.querySelector("select#design");

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
    //if none of the options are selected, the colour select label prompts the user to choose a colour
    hideOrShow("select#color", "none");
    let colorLabelSelect = document.querySelector("label[for='color']");
    colorLabelSelect.innerHTML = "Please select a t-shirt theme";
  }
});

//A function which will take the inputed element and apply the display value to that element
function hideOrShow(selectorValue, displayValue) {
  document.querySelector(selectorValue).style.display = displayValue;
}

//Add click event to the activities section
activities.addEventListener("click", activitiesInit);

//This function which is triggered by clicking within the activities area
function activitiesInit() {
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
  //activity, and adds it to checkedCostDataName array initialised above
  for (let i = 0; i < nameArray.length; i++) {
    let nameString = "input[name = '" + nameArray[i] + "']";
    //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    //I selected the dataset values using the info on the above page
    checkedCostDataName.push([
      document.querySelector(nameString).checked,
      parseInt(document.querySelector(nameString).dataset.cost),
      document.querySelector(nameString).dataset.dayAndTime,
      nameString,
    ]);
  }

  //this enables and disables clashing selected events
  //it will also apply the className disabled to the different events, which coincides with
  //css properties, which apply a linethrough
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
  //this loop tallies up the total cost of all the selected events and
  //adds them to the sum variable
  for (let i = 0; i < checkedCostDataName.length; i++) {
    if (checkedCostDataName[i][0]) {
      sum += checkedCostDataName[i][1];
    }
  }

  //display the accumulated sum
  cost.innerHTML = "Total: $" + sum;
  validateActivities(sum); //this sum variable is then passed to the validateActivities function
}

//Payment info section, when called it set the display value of the three
//payment options
function setPaymentOption(creditCard, paypal, bitcoin) {
  hideOrShow("#credit-card", creditCard);
  hideOrShow("#paypal", paypal);
  hideOrShow("#bitcoin", bitcoin);
}

//Payment method click event, calls the setPaymentOption() depending on the value
//which changes the display value of the one that has been selected
//it also validates the payment details by calling the function validatePaymentDetails
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

//this function validates the basic info input making sure there is a
//name entered, and a valid email
function validateBasicInfo() {
  let pass = true;
  let errorText = "";

  const name = document.getElementById("name");
  const email = document.getElementById("mail");

  const emailRegex = /^([\w_\.-]+)@([\w\.-]+)\.([a-z\.]{2,5})$/;
  //This regex was altered slightly from expression in this RegEx manual: source https://www.keycdn.com/support/regex-cheatsheet
  //and tests for a valid email address
  if (!name.value) {
    errorText += "Please enter your name above <br>";
    name.className = "invalid";
    pass = false;
  } else {
    name.className = "valid";
  }
  if (!email.value.match(emailRegex)) {
    errorText += "Please enter a valid email address <br>";
    email.className = "invalid";
    pass = false;
  } else {
    email.className = "valid";
  }
  errorMessageBasicInfo.innerHTML = errorText;
  return pass;
}

function validateActivities() {
  let pass = true;
  const nameArray = [
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

  //calculate the sum of the cost of the selected activities
  for (let i = 0; i < checkedCostDataName.length; i++) {
    if (checkedCostDataName[i][0]) {
      sum += checkedCostDataName[i][1];
    }
  }

  //display the accumulated sum
  cost.innerHTML = "Total: $" + sum;
  let errorText = "";
  //this generates the error text if the error condition is met when the sum is zero
  if (sum === 0) {
    errorText = "Please choose at least one activity";
    pass = false;
  }
  errorMessageActivities.innerHTML = errorText;
  return pass;
}

//add keyup events to the credit card payment inputs so that the error messages can be updated as
//the user inputs the details
ccNum.addEventListener("keyup", validatePaymentDetails);
zip.addEventListener("keyup", validatePaymentDetails);
cvv.addEventListener("keyup", validatePaymentDetails);

//this function uses regex values to check if the credit card details are correct
//it will then append the relevant error messages to the error message <p> element
//it also update the class names of the credit card input spaces to reflect
//whether it is valid or invalid
function validatePaymentDetails() {
  let pass = true;
  let errorText = "";
  if (paymentMethodInput.value === "credit card") {
    const numberOfDigitsCCRegex = /^[0-9]{13,16}$/; //this regex value is for a 13-16 digit number

    //the credit card will have a different error message depending on whether it is
    //an empty value or an invalid input
    if (ccNum.value === "") {
      ccNum.className = "invalid";
      errorText +=
        "Card number: This field has been left empty, please add a number between 13-16 characters <br>";
      pass = false;
    } else if (numberOfDigitsCCRegex.test(ccNum.value)) {
      ccNum.className = "valid";
    } else {
      ccNum.className = "invalid";
      errorText +=
        "Card number: Please enter a number between 13-16 characters <br>";
      pass = false;
    }
    const zipRegex = /^[0-9]{5}$/; // this regex value is for a 5 digit zip code

    if (zipRegex.test(zip.value)) {
      zip.className = "valid";
    } else {
      zip.className = "invalid";
      errorText += "ZIP value: Please enter a ZIP code 5 digits long.<br>";
      pass = false;
    }

    const cvvRegex = /^[0-9]{3}$/; //this regex value is for a 3 digit cvv number

    if (cvvRegex.test(cvv.value)) {
      cvv.className = "valid";
    } else {
      cvv.className = "invalid";
      errorText += "CVV: Please enter a 3 digit CVV code. <br>";
      pass = false;
    }
  } else {
    errorText = "";
  }

  if (paymentMethodInput.value === "select method") {
    pass = false;
  }

  errorMessagePaymentInfo.innerHTML = errorText; //the error text is updated to reflect any errors

  return pass;

  //need to make sure it fails if no payment option chose
  //and if other payment options are chosen
}

//the submit button validates the content of the different input areas
submit.addEventListener("click", (e) => {
  validateBasicInfo();
  validateActivities();
  validatePaymentDetails();
  if (
    !(validateBasicInfo() && validateActivities() && validatePaymentDetails())
  ) {
    e.preventDefault(); // stops the page refreshing
  }
});

setPaymentOption("block", "none", "none"); //initialise payment option
initialiseColorSelect(); //initialise the colour select option as hidden
