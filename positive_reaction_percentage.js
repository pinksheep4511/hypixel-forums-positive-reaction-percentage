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

const forumerPositives = [];
const forumerPositiveCount = [];
const forumerNegatives = [];
const forumerNegativeCount = [];

let positivesChecked = 0;
let negativesChecked = 0;

/* Get the users' positive and negative reaction counts */
for (let i = 0; i < reactionBarCount; i++) {
    /* Get the users' positive reaction counts */
    if (document.getElementsByClassName("sv-rating-count-bar")[i].getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category2--background")[0]) { //check if the forumer has any positives
        forumerPositives[positivesChecked] = document.getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category2--background")[positivesChecked];

        /* Get the number of positives displayed when hovering over the green area of the reaction bar */
        forumerPositiveCount[i] = forumerPositives[positivesChecked].getAttribute("data-original-title");
        forumerPositiveCount[i] = parseInt(forumerPositiveCount[i].match(/\d+/));
        positivesChecked += 1;
    }
    else {
        forumerPositiveCount[i] = 0;
    }
    console.log(forumerPositiveCount[i]);

    /* Get the users' negative reaction counts */
    if (document.getElementsByClassName("sv-rating-count-bar")[i].getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category1--background")[0]) { //check if the forumer has any negatives
        forumerNegatives[negativesChecked] = document.getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category1--background")[negativesChecked];

        /* Get the number of negatives displayed when hovering over the red area of the reaction bar */
        forumerNegativeCount[i] = forumerNegatives[negativesChecked].getAttribute("data-original-title");
        forumerNegativeCount[i] = parseInt(forumerNegativeCount[i].match(/\d+/));
        negativesChecked += 1;
    }
    else {
        forumerNegativeCount[i] = 0;
    }
    console.log(forumerNegativeCount[i]);
}

// Display the user's positive reaction percentage
for (let i = 0; i < reactionBarCount; i++) {
    positiveReactionPercentage[i].insertAdjacentHTML("afterend", "<div style=\"text-align:center;color:rgb(0,0,0)\">" + Math.round(forumerPositiveCount[i] / (forumerPositiveCount[i] + forumerNegativeCount[i]) * 10000) / 100 + "%</div>");
}
