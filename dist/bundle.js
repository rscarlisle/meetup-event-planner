(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// challenge: given a sum & an array, find 2 numbers that equal the array - solved below!
// extra credit: solve problem with forEach, map, and reduce loops. Any more ideas for solving this challenge?
var myArray = [1,3,5,7,2,9,8,6];
var sum = 15;
var i,j = 0;

for (i = 0; i <= myArray.length; i++) {
	for (j = 0; j <= myArray.length; j++) {
		if (myArray[i] + myArray[j] === sum) {
			console.log(myArray[i] + ' + ' + myArray[j] + ' === ' + sum)
		}
	}
}
},{}]},{},[1]);
