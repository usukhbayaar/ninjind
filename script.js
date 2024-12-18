"use strict";
import confetti from "https://cdn.skypack.dev/canvas-confetti";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

// Preload images
const preloadedImages = {};
preloadImages();

function preloadImages() {
  for (let i = 0; i <= MAX_IMAGES; i++) {
    const img = new Image();
    img.src = `img/cat-${i}.jpg`;
    preloadedImages[i] = img;
  }

  const yesImg = new Image();
  yesImg.src = "img/cat-yes.jpg";
  preloadedImages["yes"] = yesImg;
}

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
  confetti(); // Trigger confetti animation
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  if (preloadedImages[image]) {
    catImg.src = preloadedImages[image].src;
  } else {
    console.error(`Image not preloaded: ${image}`);
  }
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}
