let table = document.getElementById('table')
console.log("Table ",table);

// Initialize an empty array to store transactions
let transactions = [];

function printValues(e){

    e.preventDefault();


    let date=document.getElementsByClassName('dateInput')[0].value;
    let amount=document.getElementsByClassName('amountInput')[0].value;
    let transaction=document.getElementsByClassName('transactionType')[0].value;

    // Create transaction object
    let transactionObj = {
        date: date,
        amount: parseFloat(amount),
        type: transaction
    };

    // Push to transactions array
    transactions.push(transactionObj);

    let row=document.createElement('tr');

    let amountCell = document.createElement('td')
    amountCell.innerText=amount;

    let transactionCell=document.createElement('td')
    transactionCell.innerText=transaction;

    let dateCell=document.createElement('td')
    dateCell.innerText=date;

    let binCell=document.createElement('td')

    let deleteButton=document.createElement('button')

    let binImage=document.createElement('img')
    binImage.src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
    binImage.style.width="25px"
    binImage.style.height="25px"
    deleteButton.innerText="Delete"

    deleteButton.appendChild(binImage)
    deleteButton.classList.add('delete-button')

    // Add event listener to delete button
    deleteButton.addEventListener('click', function() {
        // Remove from array
        let index = transactions.indexOf(transactionObj);
        if (index > -1) {
            transactions.splice(index, 1);
        }
        // Remove row from table
        row.remove();
        // Update totals
        updateTotals();
    });


    binCell.appendChild(deleteButton)
    row.appendChild(amountCell)
    row.appendChild(transactionCell)
    row.appendChild(dateCell);
    row.appendChild(binCell)

    table.append(row)

    // Clear form inputs
    document.getElementsByClassName('dateInput')[0].value = '';
    document.getElementsByClassName('amountInput')[0].value = '';
    document.getElementsByClassName('transactionType')[0].value = 'Transaction type';

    // Update totals after adding
    updateTotals();

    console.log("Line 139 : ",amountCell,transactionCell,dateCell,binCell);

}

// Function to update totals
function updateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(trans) {
        if (trans.type === 'income') {
            totalIncome += trans.amount;
        } else if (trans.type === 'expenses') {
            totalExpense += trans.amount;
        }
    });

    let balance = totalIncome - totalExpense;

    // Update the cards
    document.getElementById('totalIncome').innerText = totalIncome.toLocaleString();
    document.getElementById('expense').innerText = totalExpense.toLocaleString();
    document.getElementById('balance').innerText = balance.toLocaleString();
}
