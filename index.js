// We import the 'inquirer' library, which lets us ask the user questions
import inquirer from 'inquirer';

// --- Helper Functions ---

/**
 * Calculates BMI using the standard formula.
 * @param {number} weight - Weight in kilograms (kg)
 * @param {number} height - Height in meters (m)
 * @returns {number} The calculated BMI
 */
function calculateBMI(weight, height) {
  // BMI = weight (kg) / (height (m) * height (m))
  // We check if height is 0 to avoid dividing by zero, which causes an error.
  if (height <= 0) {
    return 0;
  }
  return weight / (height * height);
}

/**
 * Provides a text interpretation of a BMI value.
 * @param {number} bmi - The BMI value
 * @returns {string} A category (e.g., "Underweight", "Normal weight")
 */
function interpretBMI(bmi) {
  if (bmi <= 0) {
    return "Invalid input";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal weight";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

// --- Main Program Logic ---

/**
 * Defines the questions we will ask the user.
 */
const questions = [
  {
    type: 'input', // 'input' type gives a text prompt
    name: 'weight',
    message: 'Please enter your weight in kilograms (kg):',
    // We add validation to make sure the user enters a valid number
    validate: (value) => {
      const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
      return valid || 'Please enter a positive number for weight.';
    },
  },
  {
    type: 'input',
    name: 'height',
    message: 'Please enter your height in meters (m) (e.g., 1.75):',
    validate: (value) => {
      const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
      return valid || 'Please enter a positive number for height.';
    },
  },
];

/**
 * The main function to run our application.
 * We use 'async' to work with 'inquirer' (which is asynchronous).
 */
async function runCalculator() {
  console.log('Welcome to the BMI Calculator!');
  console.log('--------------------------------');

  try {
    // 1. Ask the user the questions and wait for their answers
    const answers = await inquirer.prompt(questions);

    // 2. Convert the text answers into numbers (floats)
    const weight = parseFloat(answers.weight);
    const height = parseFloat(answers.height);

    // 3. Calculate the BMI
    const bmi = calculateBMI(weight, height);

    // 4. Get the interpretation
    const category = interpretBMI(bmi);

    // 5. Display the final results
    console.log('\n--- Your Results ---');
    // .toFixed(2) rounds the BMI to 2 decimal places for a cleaner look
    console.log(`Your BMI is: ${bmi.toFixed(2)}`);
    console.log(`This is considered: ${category}`);
    console.log('--------------------');

  } catch (error) {
    // This will catch any unexpected errors
    console.error('An error occurred:', error);
  }
}

// This is the entry point that starts the whole program
runCalculator();