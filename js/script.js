//hide the other job input
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
});

//Payment info section

initialiseColorSelect();
