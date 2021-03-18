"use strict";

//Model of all features
const features = {
  stickerDramaqueen: false,
  stickerHeart: false,
  stickerRainbow: false,
  phonegripButterfly: false,
  phonegripHeart: false,
  phonegripHalo: false,
};

//Global variable
let elementToPaint;

window.addEventListener("DOMContentLoaded", init);

async function init() {
  console.log("It works 👍🏻");

  //Fetch svg
  let response = await fetch("iphone_basic.svg");
  let mySvgData = await response.text();
  document.querySelector("#iphone-basic").innerHTML = mySvgData;

  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
  startColorManipulation();
}

//Color configurator
function startColorManipulation() {
  document.querySelectorAll(".g_to_interact_with").forEach((eachG) => {
    eachG.addEventListener("click", clickWantedColorArea);
    eachG.addEventListener("mouseover", mouseOverWantedColorArea);
    eachG.addEventListener("mouseout", mouseOutWantedColorArea);
  });

  document.querySelectorAll(".color_btn").forEach((each_btn) => {
    each_btn.addEventListener("click", clickWantedColor);
  });
}

function clickWantedColorArea() {
  elementToPaint = this;
  this.style.fill = "grey";
}

function mouseOverWantedColorArea() {
  this.style.stroke = "black";
}

function mouseOutWantedColorArea() {
  this.style.stroke = "none";
}

function clickWantedColor() {
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}

//Feature configurator
function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  //Toggle feature in model
  features[feature] = !features[feature];
  if (features[feature] === true) {
    if (feature === "phonegripButterfly" && (features.phonegripHeart === true || features.phonegripHalo === true)) {
      document.querySelector(`[data-feature="phonegripHeart"]`).classList.add("hide");
      document.querySelector(`[data-feature="phonegripHalo"]`).classList.add("hide");
      //document.querySelector("phonegripHalo").classList.remove("chosen");
      //features.phonegripHalo = false;
      document.querySelector("#phonegripHeart").classList.remove("chosen");
      features.phonegripHeart = false;
      alert("You can only add one phonegrip at the time 1");
    } else if (feature === "phonegripHeart" && (features.phonegripButterfly === true || features.phonegripHalo === true)) {
      document.querySelector(`[data-feature="phonegripButterfly"]`).classList.add("hide");
      document.querySelector(`[data-feature="phonegripHalo"]`).classList.add("hide");
      //document.querySelector("phonegripHalo").classList.remove("chosen");
      //features.phonegripHalo = false;
      document.querySelector("#phonegripButterfly").classList.remove("chosen");
      features.phonegripButterfly = false;
      alert("You can only add one phonegrip at the time 2");
    } /* else if (feature === "phonegripHalo" && (features.phonegripButterfly === true || features.phonegripHeart)) {
        document.querySelector(`[data-feature="phonegripButterfly"]`).classList.add("hide");
      document.querySelector(`[data-feature="phonegripHeart"]`).classList.add("hide");
      document.querySelector("phonegripHeart").classList.remove("chosen");
      features.phonegripHeart = false;
      document.querySelector("#phonegripButterfly").classList.remove("chosen");
      features.phonegripButterfly = false;
      alert("You can only add one phonegrip at the time"); 
    } */
    console.log(target);

    //Select target and add chosen class
    target.classList.add("chosen");

    //Remove the hide class
    document.querySelector(`[data-feature="${feature}"]`).classList.remove("hide");
  } else {
    target.classList.remove("chosen");

    //Add the hide class
    document.querySelector(`[data-feature="${feature}"]`).classList.add("hide");
  }
}
