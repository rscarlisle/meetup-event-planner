// challenge: given a sum & an array, find 2 numbers that equal the array - solved below!
// extra credit: solve problem with forEach, map, and reduce loops. Any more ideas for solving this challenge?
var myArray = [1,3,5,7,2,9,8,6];
var sum = 15;
var i,j = 0;

for (i = 0; i <= myArray.length; i++) {
	for (j = 0; j <= myArray.length; j++) {
		if (myArray[i] + myArray[j] === sum) {
			console.log(myArray[i] + ' + ' + myArray[j] + ' === ' + sum);
		}
	}
}