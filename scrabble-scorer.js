// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync"); // this is going to pull in the fucktion that allows me to get data

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer (word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
   for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}
	return letterPoints;
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// Prompted user to enter a word
function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let prompt = input.question("Enter a word to score: ");
   return prompt; 
};

//Iterates over collection to call back each item inside the collection
let newPointStructure = transform(oldPointStructure);

function simpleScorer (word) {
   return word.length;
};

function vowelBonusScorer(word) {
   const vowels = ['a', 'e', 'i', 'o','u'];
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3;
      } else {
         score +=1;
      }
   }
      return score;
      };

   function scrabbleScorer(word) {
      word = word.toLowerCase();
      let totalScore = 0;
      for (let i = 0; i < word.length; i++) {
         if(newPointStructure[word[i]]) {
               totalScore += (newPointStructure[word[i]]);
            }
         }
      return totalScore;
   };


const scoringAlgorithms = [
   {
      name: 'Simple Score',
      number: '0',
      description: 'One point per character',
      scorerFunction: simpleScorer
   },
   {
      name: 'Vowel Bonus Score',
      number: '1',
      description: 'Vowels are worth 3 points',
      scorerFunction: vowelBonusScorer
   }, 
   {
      name: 'Scrabble Score',
        number: '2',
        description: 'Uses scrabble point system',
        scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   numberInput = input.question(`\nWhich scoring algorithm would you like to use?\n
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
   \nPlease enter 0, 1, or 2:\n `);
 
   if (numberInput === '0') {
     return (`Score for ${word}: ${scoringAlgorithms[0].scorerFunction(word)}`);
   } else if (numberInput === '1') {
     return (`Score for ${word}: ${scoringAlgorithms[1].scorerFunction(word)}`);
   } else if (numberInput === '2') {
     return  (`Score for ${word}: ${scoringAlgorithms[2].scorerFunction(word)}`)
   } else {
     console.log('Invaild number');
     scorerPrompt();
   }
 };

function transform(oldPointStructure) {
   let newPointObject = {};
   let newPreObject;
   for(let key in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[key].length; i ++) {
         newPreObject = oldPointStructure[key][i].toLowerCase()
         newPointObject[newPreObject] = Number(key);
      }
   }
   return newPointObject;
};

function runProgram() {
   transform(oldPointStructure);
   let prompt = initialPrompt();
   console.log (scorerPrompt(prompt));
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
