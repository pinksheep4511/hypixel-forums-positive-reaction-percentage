// ==UserScript==
// @name         Forumer positive reaction percentage
// @namespace    http://tampermonkey.net/
// @version      2024-12-31
// @description  display a forumer's positive reaction percentage
// @author       pinksheep451/pinksheep4511
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

/* Get the users' positive and negative reaction counts (this unfortunately does not work all the time) */
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
        try {
            forumerPositiveCount[i] = forumerPositives[positivesChecked].getAttribute("data-original-title");
            forumerPositiveCount[i] = parseInt(forumerPositiveCount[i].match(/\d+/));
            console.log("Positive reactions: " + forumerPositiveCount[i]); //Log the positive reaction count into the console
        }
        catch (error) {
            console.log("Oops! Something went wrong while fetching the user's positive reaction count, try refreshing the page.");
            forumerPositiveCount[i] = 0;
        }
        positivesChecked += 1;
    }
    else {
        forumerPositiveCount[i] = 0;
        console.log("Positive reactions: " + forumerPositiveCount[i]); //Log 0 positive reactions into the console since the forumer doesn't have any positives
    }

    /* Get the users' negative reaction counts */
    if (document.getElementsByClassName("sv-rating-count-bar")[i].getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category1--background")[0]) { //Check if the forumer has any negatives
        forumerNegatives[negativesChecked] = document.getElementsByClassName("sv-rating-count-bar__fragment sv-rating-type-category1--background")[negativesChecked];

        /* Get the number of negatives displayed when hovering over the red area of the reaction bar */
        try {
            forumerNegativeCount[i] = forumerNegatives[negativesChecked].getAttribute("data-original-title");
            forumerNegativeCount[i] = parseInt(forumerNegativeCount[i].match(/\d+/));
            console.log("Negative reactions: " + forumerNegativeCount[i]); //Log the negative reaction count into the console
        }
        catch (error) {
            console.log("Oops! Something went wrong while fetching the user's negative reaction count, try refreshing the page.");
            forumerNegativeCount[i] = 0;
        }
        negativesChecked += 1;
    }
    else {
        forumerNegativeCount[i] = 0;
        console.log("Negative reactions: " + forumerNegativeCount[i]); //Log 0 negative reactions into the console since the forumer doesn't have any negatives
    }

    let positiveReactionPercent = forumerPositiveCount[i] / (forumerPositiveCount[i] + forumerNegativeCount[i]) * 100; //calculate the positive reaction percentage

    /* Change the background color of the display depending on the positive reaction percentage and the color thresholds */
    let red;
    let green;
    let red_threshold = 60;
    let yellow_threshold = 80;
    let green_threshold = 100;
    if (positiveReactionPercent >= green_threshold) { //set the background to a green color when the positive % is at or above the "green threshold"
        red = 0;
        green = 204;
    }
    else if (positiveReactionPercent >= yellow_threshold) { //set the background to a scaling color between yellow and green when the positive % is at or above the "yellow threshold"
        red = Math.round((green_threshold - positiveReactionPercent) * 204 / (green_threshold - yellow_threshold));
        green = 204;
    }
    else if (positiveReactionPercent >= red_threshold) { //set the background to a scaling color between red and yellow when the positive % is at or above the "red threshold"
        red = 204;
        green = Math.round((positiveReactionPercent - red_threshold) * 204 / (yellow_threshold - red_threshold));
    }
    else if (positiveReactionPercent >= 0) { //set the background to a scaling color between red and yellow when the positive % is below the "red threshold"
        red = 204;
        green = 0;
    }

    /* Display the user's positive reaction percentage */
    if (isNaN(positiveReactionPercent)) {
        positiveReactionPercentage[i].insertAdjacentHTML("afterend", "<div style=\"text-align:center\">Oops! Something went wrong, try refreshing the page.</div>");
    }
    else {
        positiveReactionPercentage[i].insertAdjacentHTML("afterend", "<div style=\"text-align:center;background:rgb(" + red + "," + green + ",0)\">" + (Math.round(positiveReactionPercent * 100) / 100) + "% positive</div>"); //finally, display the positive reaction percentage (with up to two decimal places of precision) below the user's reaction bar
        console.log(positiveReactionPercent + "% positive reactions"); //Log the positive % into the console (with full precision)
    }
}
