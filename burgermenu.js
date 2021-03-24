"use strict"; 

window.addEventListener("load", sidenvises);


function sidenvises() {
    console.log("sidenvises");

    document.querySelector("#menuknap").addEventListener("click", toggleMenu)
}

function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#menu").classList.toggle("hidden");

    let erskjult = document.querySelector("#menu").classList.contains("hidden");

    if (erskjult == true) {

        document.querySelector("#menuknap").textContent = "☰";

    } else {
        document.querySelector("#menuknap").textContent = "x";
    }

}