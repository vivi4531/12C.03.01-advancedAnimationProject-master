"use strict";

let splittetText;

window.addEventListener("load", init);

function init() {
  console.log("init");
  // get the text from somevhere
  let text = document.querySelector("#cooltext");

  //create array
  splittetText = text.textContent.split("");
  console.log(splittetText);

  // clear the HTML area
  text.textContent = "";

  //add animation for each letter
  splittetText.forEach((letter, index) => {
    const textToAnimate = document.createElement("span");
    textToAnimate.classList.add("textwave");
    textToAnimate.style.setProperty("--delay", index);
    if (letter === " ") {
      textToAnimate.innerHTML = "&nbsp;";
    } else {
      textToAnimate.textContent = letter;
    }

    text.append(textToAnimate);
  });
}
