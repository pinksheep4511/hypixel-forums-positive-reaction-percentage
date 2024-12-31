// ==UserScript==
// @name         Forumer positive reaction percentage
// @namespace    http://tampermonkey.net/
// @version      2024-12-31
// @description  display a forumer's positive reaction percentage
// @author       You
// @match        https://hypixel.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hypixel.net
// @grant        none
// ==/UserScript==

/* Count the number of reaction bars (the number of forumers with positives or negatives) */
let reactionBarCount = document.getElementsByClassName("sv-rating-count-bar").length;
const positiveReactionPercentage = document.getElementsByClassName("sv-rating-count-bar");

const forumer = [];
const forumerUsername = [];
const forumerPositives = [];
const forumerPositiveCount = [];
const forumerNegatives = [];
const forumerNegativeCount = [];

/* Since not all users will have positives AND negatives, we need to use variables to properly check a user's reactions in case they have either zero positives or zero negatives */
let positivesChecked = 0;
let negativesChecked = 0;

/* Get the users' positive and negative reaction counts */
for (let i = 0; i < reactionBarCount; i++) {
    /* Add a line break to the console to improve readability */
    console.log("");

    /* Get the forum user that made the post */
    forumer[i] = document.getElementsByClassName("message message--post js-post js-inlineModContainer   ")[i];
    forumerUsername[i] = forumer[i].getAttribute("data-author");
    console.log("Forum user: " + forumerUsername[i]); // Log the user in the console to associate the reactions into it

    /* Get the users' positive reaction counts */
    if (document.getElementsByClassName("sv-rating-count-bar")[i].getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category2--background")[0]) { //Check if the forumer has any positives
        forumerPositives[positivesChecked] = document.getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category2--background")[positivesChecked];

        /* Get the number of positives displayed when hovering over the green area of the reaction bar */
        forumerPositiveCount[i] = forumerPositives[positivesChecked].getAttribute("data-original-title");
        forumerPositiveCount[i] = parseInt(forumerPositiveCount[i].match(/\d+/));

        positivesChecked += 1;
    }
    else {
        forumerPositiveCount[i] = 0;
    }
    console.log("Positive reactions: " + forumerPositiveCount[i]); //Log the positive reaction count into the console

    /* Get the users' negative reaction counts */
    if (document.getElementsByClassName("sv-rating-count-bar")[i].getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category1--background")[0]) { //Check if the forumer has any negatives
        forumerNegatives[negativesChecked] = document.getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category1--background")[negativesChecked];

        /* Get the number of negatives displayed when hovering over the red area of the reaction bar */
        forumerNegativeCount[i] = forumerNegatives[negativesChecked].getAttribute("data-original-title");
        forumerNegativeCount[i] = parseInt(forumerNegativeCount[i].match(/\d+/));

        negativesChecked += 1;
    }
    else {
        forumerNegativeCount[i] = 0;
    }
    console.log("Negative reactions: " + forumerNegativeCount[i]); //Log the negative reaction count into the console
}

/* Display the user's positive reaction percentage */
for (let i = 0; i < reactionBarCount; i++) {
    let positiveReactionPercent = Math.round(forumerPositiveCount[i] / (forumerPositiveCount[i] + forumerNegativeCount[i]) * 10000) / 100; //calculate the positive reaction percentage with up to two decimal places of precision
    let red;
    let green;

    /* Change the background color of the display depending on the positive reaction percentage */
    if (positiveReactionPercent >= 80) {
        red = Math.round((100 - positiveReactionPercent) * 204 / 20);
        green = 204;
    }
    else if (positiveReactionPercent >= 60) {
        red = 204;
        green = Math.round((positiveReactionPercent - 60) * 204 / 20);
    }
    else {
        red = 204;
        green = 0;
    }
    positiveReactionPercentage[i].insertAdjacentHTML("afterend", "<div style=\"text-align:center;background:rgb(" + red + "," + green + ",0)\">" + positiveReactionPercent + "% positive</div>"); //finally, display the positive reaction percentage below the user's reaction bar
}
