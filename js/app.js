var app = new Vue({
  el: "#app",
  data: {
    bankMoney: 0,
    incomes: [
      { label: "Mariah's Pay", amount: 2000 },
      { label: "Drew's Pay", amount: 0 }
    ],
    bills: [
      { label: "Tithe", dueDate: "00", amountDue: 0, check: 1 },
      { label: "Rent", dueDate: "01", amountDue: 920, check: 0 },
      { label: "Duke Energy", dueDate: "01", amountDue: 95, check: 0 },
      { label: "Apple Billing", dueDate: "03", amountDue: 20, check: 0 },
      { label: "Amazon Prime", dueDate: "08", amountDue: 7, check: 0 },
      { label: "Car Payment", dueDate: "10", amountDue: 185, check: 0 },
      { label: "Franciscan", dueDate: "10", amountDue: 56, check: 0 },
      { label: "Best Buy", dueDate: "10", amountDue: 28, check: 0 },
      { label: "T-Mobile", dueDate: "11", amountDue: 122, check: 0 },
      { label: "Xfinity", dueDate: "14", amountDue: 30, check: 0 },
      { label: "Netflix", dueDate: "17", amountDue: 14, check: 0 },
      { label: "Hulu", dueDate: "18", amountDue: 55, check: 0 },
      { label: "Navient", dueDate: "18", amountDue: 139, check: 0 },
      { label: "Compassion Int.", dueDate: "19", amountDue: 38, check: 0 },
      { label: "Sallie Mae", dueDate: "20", amountDue: 342, check: 0 },
      { label: "Medishare", dueDate: "20", amountDue: 251, check: 0 },
      { label: "Esurance", dueDate: "28", amountDue: 128, check: 0 }
    ],
    billCounter: 0,
    tithe: 0
  },
  methods: {
    setIncome: function(event, index) {
      this.incomes[index].amount = Number(event.target.value);
      //console.log(this.incomes);
      this.getTithe();
    },

    getIncome: function() {
      let incomeCounter = 0;
      for (let i = 0; i < this.incomes.length; i++) {
        incomeCounter += this.incomes[i].amount;
      }
      return incomeCounter;
    },

    getTithe: function() {
      //reset tithe tracker
      this.tithe = this.getIncome() / 10;
    },

    //function to count the amount due in bills, runs again every time a bill is clicked.
    countBills: function() {
      //reset the bill counter
      this.billCounter = 0;
      //loop thru bills and add them up
      for (let i = 0; i < this.bills.length; i++) {
        if (this.bills[i].check == 1) {
          this.billCounter += this.bills[i].amountDue;
        }
      }
    },

    //function to toggle billDate bgColor when bill is checked (checkbox is hidden so this lets userr know what is selected)
    toggleChecked: function(billIndex) {
      //copy the bills data
      let billsCopy = this.bills.splice(0);
      //toggle the check property in the copied version
      if (billsCopy[billIndex].check == 0) {
        billsCopy[billIndex].check = 1;
      } else {
        billsCopy[billIndex].check = 0;
      }
      // billsCopy[billIndex].check == 0 ? 1 : 0;
      //console.log(billsCopy[billIndex]);
      //put the modified version in the data
      this.bills = billsCopy;
      //console.log(billIndex);
    },

    budget: function() {
      //start budget tracker equal to money in the bank
      let budgetTracker = this.bankMoney;
      //get the incomes
      for (let i = 0; i < this.incomes.length; i++) {
        budgetTracker += this.incomes[i].amount;
      }
      //subtract the bills that are checked
      budgetTracker -= this.billCounter;
      return budgetTracker;
    },

    //animations for the bills
    onBillOver: function(event) {
      event.target.style.animationDelay = "0s";
      event.target.classList.add("billOver");
      event.target.classList.remove("billOut");
    },

    onBillOut: function(event) {
      event.target.classList.add("billOut");
      event.target.classList.remove("billOver");
    }
  }
});
