"use strict";

//Model of all features
const features = {
  stickerDramaqueen: false,
  stickerHeart: false,
  stickerRainbow: false,
  phonegripButterfly: false,
  phonegripHeart: false,
  phonegripHalo: false,
  coverPowerpuff: false,
  coverCandyHaerts: false,
  coverBabygirl: false,
};

//Global variable
let elementToPaint;

window.addEventListener("DOMContentLoaded", init);

async function init() {
  console.log("It works 👍🏻");

  document.querySelector("#reset").addEventListener("click", resetConfigurator);

  // document.getElementById("reset").onclick = function () {
  //   document.getElementById("iphone-basic").innerHTML = mySvgData;
  // };

  //Fetch svg
  let response = await fetch("iphone_basic.svg");
  let mySvgData = await response.text();
  document.querySelector("#iphone-basic").innerHTML = mySvgData;

  //fetch phonegriphalo
  /*   let response1 = await fetch("iphone_configurator_test-01.svg");
  let mySvgData1 = await response1.text();
  document.querySelector("#phonegripHaloSvg").innerHTML = mySvgData1; */

  //fetch powerpuff
  let response1 = await fetch("images/iphone_cover_powerpuff.svg");
  let mySvgData1 = await response1.text();
  document.querySelector("#coverPowerpuffSvg").innerHTML = mySvgData1;

  //fetch babygirl
  let response2 = await fetch("images/iphone_cover_babygirl.svg");
  let mySvgData2 = await response2.text();
  document.querySelector("#coverBabygirlSvg").innerHTML = mySvgData2;

  /*   //fetch candyhaerts
  let response3 = await fetch("images/iphone_cover_candyhearts.svg");
  let mySvgData3 = await response3.text();
  document.querySelector("#coverCandyhartsSvg").innerHTML = mySvgData3; */

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
      document.querySelector("#phonegripHalo").classList.remove("chosen");
      features.phonegripHalo = false;
      document.querySelector("#phonegripHeart").classList.remove("chosen");
      features.phonegripHeart = false;
      alert("You can only add one phonegrip at the time");
    } else if (feature === "phonegripHeart" && (features.phonegripButterfly === true || features.phonegripHalo === true)) {
      document.querySelector(`[data-feature="phonegripButterfly"]`).classList.add("hide");
      document.querySelector(`[data-feature="phonegripHalo"]`).classList.add("hide");
      document.querySelector("#phonegripHalo").classList.remove("chosen");
      features.phonegripHalo = false;
      document.querySelector("#phonegripButterfly").classList.remove("chosen");
      features.phonegripButterfly = false;
      alert("You can only add one phonegrip at the time");
    } else if (feature === "phonegripHalo" && (features.phonegripButterfly === true || features.phonegripHeart)) {
      document.querySelector(`[data-feature="phonegripButterfly"]`).classList.add("hide");
      document.querySelector(`[data-feature="phonegripHeart"]`).classList.add("hide");
      document.querySelector("#phonegripHeart").classList.remove("chosen");
      features.phonegripHeart = false;
      document.querySelector("#phonegripButterfly").classList.remove("chosen");
      features.phonegripButterfly = false;
      alert("You can only add one phonegrip at the time");
    }

    //chek for only one cover
    if (feature === "coverPowerpuff" && (features.coverCandyHaerts === true || features.coverBabygirl === true)) {
      document.querySelector(`[data-feature="coverCandyHaerts"]`).classList.add("hide");
      document.querySelector(`[data-feature="coverBabygirl"]`).classList.add("hide");
      document.querySelector("#coverBabygirl").classList.remove("chosen");
      features.coverBabygirl = false;
      document.querySelector("#coverCandyHaerts").classList.remove("chosen");
      features.coverCandyHaerts = false;
      alert("You can only add one cover at the time");
    } else if (feature === "coverCandyHaerts" && (features.coverPowerpuff === true || features.coverBabygirl === true)) {
      document.querySelector(`[data-feature="coverPowerpuff"]`).classList.add("hide");
      document.querySelector(`[data-feature="coverBabygirl"]`).classList.add("hide");
      document.querySelector("#coverBabygirl").classList.remove("chosen");
      features.coverBabygirl = false;
      document.querySelector("#coverPowerpuff").classList.remove("chosen");
      features.coverPowerpuff = false;
      alert("You can only add one cover at the time");
    } else if (feature === "coverBabygirl" && (features.coverPowerpuff === true || features.coverCandyHaerts)) {
      document.querySelector(`[data-feature="coverPowerpuff"]`).classList.add("hide");
      document.querySelector(`[data-feature="coverCandyHaerts"]`).classList.add("hide");
      document.querySelector("#coverCandyHaerts").classList.remove("chosen");
      features.coverCandyHaerts = false;
      document.querySelector("#coverPowerpuff").classList.remove("chosen");
      features.coverPowerpuff = false;
      alert("You can only add one cover at the time");
    }

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

function resetConfigurator() {
  document.querySelectorAll("#product-preview [data-feature]").forEach((each_previewFeature) => {
    each_previewFeature.classList.add("hide");
  });

  document.querySelectorAll("#options [data-feature]").forEach((each_optionFeature) => {
    each_optionFeature.classList.remove("chosen");
  });

  features.stickerDramaqueen = false;
  features.stickerHeart = false;
  features.stickerRainbow = false;
  features.phonegripButterfly = false;
  features.phonegripHeart = false;
  features.phonegripHalo = false;
  features.coverPowerpuff = false;
  features.coverCandyHaerts = false;
  features.coverBabygirl = false;

  // elementToPaint.style.fill = "none";

  document.querySelectorAll(".g_to_interact_with").forEach((eachG) => {
    eachG.style.fill = "none";
  });
}
