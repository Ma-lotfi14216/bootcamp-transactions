const transactionBtn = document.querySelector(".transaction-btn");
const tableContainer = document.querySelector(".table-container");
const form = document.querySelector(".nav-search__search-box");
const searchBox = document.querySelector(".search-box");
const sortByPrice = document.querySelector(".price-inc");
const sortByDate = document.querySelector(".date-inc");
const transactionsSections = document.querySelector(
  ".transactions-table__sections"
);
const transactionPrice = document.querySelector(".transaction-price");
const transactionDate = document.querySelector(".transaction-date");

let transactions = [];
transactionBtn.addEventListener("click", showTransactionTable);
transactionDate.addEventListener("click", sortTransactions);
transactionPrice.addEventListener("click", sortTransactions);
searchBox.addEventListener("input", searchTransaction);

function showTransactionTable() {
  transactionBtn.style.display = "none";
  tableContainer.style.display = "block";
  searchBox.disabled = false;
  getTransactions(transactions);
}

function getTransactions(transactions) {
  let rowNumber = 1;
  let result = "";
  transactions.forEach((item) => {
    const transaction = `<div class="transaction-table__section">
         <span>${rowNumber}</span>
         <span class="transaction-section__type"> ${item.type}</span>
         <span class="transaction-section__price">${item.price}</span>
         <span class="transaction-section__refId">${item.refId}</span>
         <span class="transaction-section__date">${new Date(
           item.date
         ).toLocaleString("fa-IR", {
           dateStyle: "long",
           timeStyle: "short",
         })}</span>
         </div>`;
    result += transaction;
    rowNumber++;
  });
  transactionsSections.innerHTML = result;
}
function sortTransactions(e) {
  const idSort = e.target.dataset.idSort;
  let transactions = [];
  if (idSort == 1) {
    sortByPrice.classList.toggle("fa-rotate-180");
    if (sortByPrice.classList.contains("fa-rotate-180")) {
      axios
        .get("http://localhost:3000/transactions?_sort=price")
        .then((res) => {
          transactions = res.data;
          getTransactions(transactions);
        })
        .catch((err) => alert(err.response.data.error));
    } else {
      axios
        .get("http://localhost:3000/transactions?_sort=-price")
        .then((res) => {
          transactions = res.data;
          getTransactions(transactions);
        })
        .catch((err) => alert(err.response.data.error));
    }
  } else if (idSort == 2) {
    sortByDate.classList.toggle("fa-rotate-180");
    if (sortByDate.classList.contains("fa-rotate-180")) {
      axios
        .get("http://localhost:3000/transactions?_sort=-date")
        .then((res) => {
          transactions = res.data;
          getTransactions(transactions);
        })
        .catch((err) => alert(err.response.data.error));
    } else {
      axios
        .get("http://localhost:3000/transactions?_sort=date")
        .then((res) => {
          transactions = res.data;
          getTransactions(transactions);
        })
        .catch((err) => alert(err.response.data.error));
    }
  }
}
function searchTransaction(e) {
  e.preventDefault();
  // console.log(e.target.value);
  let transaction = [];
  const query = e.target.value;
  axios
    .get(`http://localhost:3000/transactions?refId_like=${query}`)
    .then((res) => {
      console.log(res);
      transaction = res.data;
      console.log(transaction);
      getTransactions(transaction);
      // searchBox.value="";
    })
    .catch((err) => alert(err.response.data.error));
}

document.addEventListener("DOMContentLoaded", () => {
  searchBox.value = "";
  searchBox.disabled = true;
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      transactions = res.data;
    })
    .catch((err) => alert(err.response.data.error));
});
