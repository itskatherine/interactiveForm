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
  } else if (designSelect.value == "heart js") {
    //Show the relevant items
    hideOrShow("option[value ='tomato']", "block");
    hideOrShow("option[value ='steelblue']", "block");
    hideOrShow("option[value ='dimgrey']", "block");
    //Hide irrelevant ones
    hideOrShow("option[value ='cornflowerblue']", "none");
    hideOrShow("option[value ='darkslategrey']", "none");
    hideOrShow("option[value ='gold']", "none");
  } else {
    hideOrShow("select#color", "none");
    let colorLabelSelect = document.querySelector("label[for='color']");
    colorLabelSelect.innerHTML = "Please select a t-shirt theme";
  }
});

function hideOrShow(selectorValue, displayValue) {
  document.querySelector(selectorValue).style.display = displayValue;
}

initialiseColorSelect();
