// ==========================================
// SpendWise JavaScript Foundation
// ==========================================


// ==========================================
// 1. VARIABLES
// ==========================================

// Store the user's total budget.
let budget = 0;

// Store the total amount of expenses.
let totalExpenses = 0;

// Store individual expenses.
let expenses = [];

// Store expense information.
let expenseName = "";
let expenseAmount = 0;


// ==========================================
// 2. FUNCTION: Calculate Remaining Balance
// ==========================================

function calculateRemainingBalance(budgetAmount, expensesAmount) {

    return budgetAmount - expensesAmount;

}


// ==========================================
// 3. FUNCTION: Calculate Total Expenses
// ==========================================

function calculateTotalExpenses(expenseList) {

    let total = 0;

    for (let expense of expenseList) {

        total = total + expense.amount;

    }

    return total;

}


// ==========================================
// 4. FUNCTION: Display Results
// ==========================================

function displayResults() {

    // Calculate remaining balance.
    let remainingBalance = calculateRemainingBalance(
        budget,
        totalExpenses
    );

    // Display results in the browser console.
    console.log("========== SpendWise Budget Summary ==========");
    console.log("Total Budget: $" + budget.toFixed(2));
    console.log("Total Expenses: $" + totalExpenses.toFixed(2));
    console.log(
        "Remaining Balance: $" +
        remainingBalance.toFixed(2)
    );
    console.log("==============================================");

    // Display budget on the webpage.
    document.getElementById("budgetDisplay").textContent =
        "$" + budget.toFixed(2);

    // Display expenses on the webpage.
    document.getElementById("expenseDisplay").textContent =
        "$" + totalExpenses.toFixed(2);

    // Display remaining balance.
    document.getElementById("balanceDisplay").textContent =
        "$" + remainingBalance.toFixed(2);
}


// ==========================================
// 5. COLLECT USER INPUT
// ==========================================

// Ask the user to enter their budget.
let budgetInput = prompt(
    "Enter your total budget:"
);


// Check whether the user entered a value.
if (
    budgetInput !== null &&
    budgetInput.trim() !== ""
) {

    // Convert input from string to number.
    budget = Number(budgetInput);

    // Check whether the budget is valid.
    if (
        isNaN(budget) ||
        budget < 0
    ) {

        console.log(
            "Invalid budget. Budget has been set to $0.00."
        );

        budget = 0;
    }

} else {

    console.log(
        "No budget entered. Budget has been set to $0.00."
    );

}


// ==========================================
// 6. DISPLAY INITIAL RESULTS
// ==========================================

displayResults();


// ==========================================
// 7. GET THE EXPENSE FORM
// ==========================================

const expenseForm =
    document.getElementById("expenseForm");


// ==========================================
// 8. HANDLE FORM SUBMISSION
// ==========================================

expenseForm.addEventListener(
    "submit",
    function(event) {

        // Prevent the page from refreshing.
        event.preventDefault();


        // Get expense name from the form.
        expenseName =
            document
                .getElementById("expenseName")
                .value
                .trim();


        // Get expense amount from the form.
        expenseAmount =
            Number(
                document
                    .getElementById("expenseAmount")
                    .value
            );


        // Validate the information.
        if (
            expenseName === "" ||
            isNaN(expenseAmount) ||
            expenseAmount < 0
        ) {

            console.log(
                "Please enter a valid expense name and amount."
            );

            return;
        }


        // Add the expense to the array.
        expenses.push({

            name: expenseName,

            amount: expenseAmount

        });


        // Recalculate total expenses.
        totalExpenses =
            calculateTotalExpenses(expenses);


        // Display updated calculations.
        displayResults();


        // Get the expense list.
        const expenseList =
            document.getElementById("expenseList");


        // Remove the empty message.
        if (expenses.length === 1) {

            expenseList.innerHTML = "";

        }


        // Create a new list item.
        const listItem =
            document.createElement("li");


        // Add expense information.
        listItem.textContent =
            expenseName +
            " - $" +
            expenseAmount.toFixed(2);


        // Add the expense to the page.
        expenseList.appendChild(listItem);


        // Clear the form.
        document.getElementById(
            "expenseName"
        ).value = "";

        document.getElementById(
            "expenseAmount"
        ).value = "";

    }
);