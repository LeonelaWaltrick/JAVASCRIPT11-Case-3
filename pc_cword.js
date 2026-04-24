"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Leonela Waltrick 
   Date:  0421/2026 
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

/* ==================================================== */
/* GLOBAL VARIABLES — paste these right here */

var allLetters;      
var currentLetter;   
var wordLetters;     
var acrossClue;      
var downClue;        
var typeDirection = "right";

/* Run init when page loads */
window.onload = init;

function init() {

   // Step 6a: reference all crossword letters
   allLetters = document.querySelectorAll("table#crossword span");

   // Step 6b: set the current letter to the first letter in the puzzle
   currentLetter = allLetters[0];

   // Step 6c: get the across and down clue IDs for the first letter
   var acrossID = currentLetter.dataset.clueA;
   var downID = currentLetter.dataset.clueD;

   // Step 6d: reference the across and down clue elements
   acrossClue = document.getElementById(acrossID);
   downClue = document.getElementById(downID);

   // Step 8a: color the first letter
   formatPuzzle(currentLetter);

   // Step 8b: allow clicking on letters
   for (var i = 0; i < allLetters.length; i++) {

   // change cursor to pointer
      allLetters[i].style.cursor = "pointer";

   // clicking a letter selects it
      allLetters[i].onmousedown = function(e) {
         formatPuzzle(e.target);
      };
   }

      // Step 10: allow keyboard navigation and typing
   document.onkeydown = selectLetter;

      // Step 12: allow clicking the direction image to toggle typing direction
   var typeImage = document.getElementById("directionImg");
   typeImage.style.cursor = "pointer";
   typeImage.onclick = switchTypeDirection;

      // Step 13: Show Errors button
   document.getElementById("showErrors").onclick = function() {

      // a. highlight mistakes in red
      for (var i = 0; i < allLetters.length; i++) {
         if (allLetters[i].textContent !== allLetters[i].dataset.letter) {
            allLetters[i].style.color = "red";
         }
      }

      // b. after 3 seconds, remove red color
      setTimeout(function() {
         for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.color = "";
         }
      }, 3000);
   };

      // Step 14: Show Solution button
   document.getElementById("showSolution").onclick = function() {

      for (var i = 0; i < allLetters.length; i++) {
         allLetters[i].textContent = allLetters[i].dataset.letter;
      }

   };



}

function formatPuzzle(puzzleLetter) {

   // Step 7a: update the current letter
   currentLetter = puzzleLetter;

   // Step 7b: clear all background colors in the puzzle
   for (var i = 0; i < allLetters.length; i++) {
      allLetters[i].style.backgroundColor = "";
   }

   // Step 7c: remove clue highlighting
   if (acrossClue) acrossClue.style.color = "";
   if (downClue) downClue.style.color = "";

   // Step 7d: highlight ACROSS word if it exists
   if (currentLetter.dataset.clueA !== undefined) {

      // i. reference the across clue
      acrossClue = document.getElementById(currentLetter.dataset.clueA);

      // ii. highlight across clue in blue
      acrossClue.style.color = "blue";

      // iii. select all letters in this across word
      wordLetters = document.querySelectorAll("[data-clue-a='" + currentLetter.dataset.clueA + "']");

      // iv. highlight across word cells in light blue
      for (var j = 0; j < wordLetters.length; j++) {
         wordLetters[j].style.backgroundColor = "rgb(231, 231, 255)";
      }
   }

   // Step 7e: highlight DOWN word if it exists
   if (currentLetter.dataset.clueD !== undefined) {

      // i. reference the down clue
      downClue = document.getElementById(currentLetter.dataset.clueD);

      // ii. highlight down clue in red
      downClue.style.color = "red";

      // iii. select all letters in this down word
      wordLetters = document.querySelectorAll("[data-clue-d='" + currentLetter.dataset.clueD + "']");

      // iv. highlight down word cells in light red
      for (var k = 0; k < wordLetters.length; k++) {
         wordLetters[k].style.backgroundColor = "rgb(255, 231, 231)";
      }
   }

   // Step 7f: highlight the active cell based on typing direction
   if (typeDirection === "right") {
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   } else {
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   }
}

function selectLetter(e) {

   // Step 9a: reference neighboring letters
   var leftLetter = document.getElementById(currentLetter.dataset.left);
   var upLetter = document.getElementById(currentLetter.dataset.up);
   var rightLetter = document.getElementById(currentLetter.dataset.right);
   var downLetter = document.getElementById(currentLetter.dataset.down);

   // Step 9b: get the key code
   var userKey = e.keyCode;

   // Step 9c: respond to key presses
   if (userKey === 37 && leftLetter !== null) {
      // Left arrow
      formatPuzzle(leftLetter);

   } else if (userKey === 38 && upLetter !== null) {
      // Up arrow
      formatPuzzle(upLetter);

   } else if ((userKey === 39 || userKey === 9) && rightLetter !== null) {
      // Right arrow or Tab
      formatPuzzle(rightLetter);

   } else if ((userKey === 40 || userKey === 13) && downLetter !== null) {
      // Down arrow or Enter
      formatPuzzle(downLetter);

   } else if (userKey === 8 || userKey === 46) {
      // Backspace or Delete
      currentLetter.textContent = "";

   } else if (userKey === 32) {
      // Spacebar toggles typing direction
      switchTypeDirection();

   } else if (userKey >= 65 && userKey <= 90) {
      // A–Z letters
      currentLetter.textContent = getChar(userKey);

      // Move to next cell based on typing direction
      if (typeDirection === "right" && rightLetter !== null) {
         formatPuzzle(rightLetter);
      } else if (typeDirection === "down" && downLetter !== null) {
         formatPuzzle(downLetter);
      }
   }

   // Step 9d: prevent default browser behavior
   e.preventDefault();
}

function switchTypeDirection() {

   // Step 11a: reference the direction image
   var typeImage = document.getElementById("directionImg");

   // Step 11b–c: toggle typing direction
   if (typeDirection === "right") {

      // switch to DOWN
      typeDirection = "down";
      typeImage.src = "pc_right.png";
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";

   } else {

      // switch to RIGHT
      typeDirection = "right";
      typeImage.src = "pc_down.png";
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   }
}


   





/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
