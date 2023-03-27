const billInput = document.getElementById("bill-input");
const numberOfPeople = document.getElementById("number-of-people");
const totalPersonInput = document.getElementById("total-person");
const totalTipInput = document.getElementById("tip-amount-result");
const percentageCustom = document.getElementById("tip-percentage-custom");
const tipPercentageBtn = document.getElementById("tip-percentage");

function updateTipAndTotal() {
  const tipPercentage = getTipPercentage();
  const totalBill = parseFloat(billInput.value);
  const totalNumberOfPeople = parseFloat(numberOfPeople.value);

  if (isNaN(totalBill) || isNaN(totalNumberOfPeople)) {
    return;
  }

  const tipAmount = totalBill * tipPercentage;
  const totalTipAmount = tipAmount / totalNumberOfPeople;

  if (!isNaN(totalTipAmount)) {
    totalTipInput.innerHTML = "$" + totalTipAmount.toFixed(2);
    updateTotalPerPerson(totalTipAmount);
  }
}

function updateTotalPerPerson(totalTipAmount) {
  const tipPercentage = getTipPercentage();
  if (billInput.value !== "" && numberOfPeople.value !== "") {
    resetBtn();

    const tipAmountPerPerson = totalTipAmount;
    const totalPerson =
      parseFloat(billInput.value) / parseFloat(numberOfPeople.value) +
      totalTipAmount;

    if (isFinite(totalPerson)) {
      totalPersonInput.innerHTML = "$" + totalPerson.toFixed(2);
    } else {
      totalPersonInput.innerHTML = "$0.00";
    }
  }
}

function getTipPercentage() {
  const percentageCustom = document.getElementById("tip-percentage-custom");
  const selectedPercentage = document.querySelector(
    "[id=tip-percentage].selected"
  );
  let tipPercentage;
  if (percentageCustom.value !== "") {
    tipPercentage = parseInt(percentageCustom.value) / 100;
  } else if (selectedPercentage) {
    tipPercentage = parseInt(selectedPercentage.textContent) / 100;
  } else {
    tipPercentage = 0;
  }
  return tipPercentage;
}

percentageCustom.addEventListener("input", function () {
  updateTipAndTotal();
  $("[id=tip-percentage]").css("background", "hsl(183, 100%, 15%)");
});

$("[id=tip-percentage]").on("click", function () {
  const $prevSelected = $("[id=tip-percentage].selected");
  $prevSelected.css("background", "hsl(183, 100%, 15%)");

  $(this).css("background", "hsl(172, 67%, 45%)");
  $prevSelected.removeClass("selected");
  $(this).addClass("selected");
  percentageCustom.value = "";
  updateTipAndTotal();
});

billInput.addEventListener("input", updateTipAndTotal);
numberOfPeople.addEventListener("input", updateTipAndTotal);

function resetBtn() {
  const resetBtn = document.getElementById("reset");

  resetBtn.addEventListener("click", function () {
    billInput.value = "";
    numberOfPeople.value = "";
    totalTipInput.innerHTML = "$0.00";
    totalPersonInput.innerHTML = "$0.00";
    percentageCustom.value = "";
    $("[id=tip-percentage]").css("background", "");
    resetBtn.disabled = true;
    resetBtn.style.background = "#0D686D";
    resetBtn.style.color = "#0A6168";
  });

  billInput.addEventListener("input", function () {
    updateResetBtnState();
  });

  numberOfPeople.addEventListener("input", function () {
    updateResetBtnState();
  });

  function updateResetBtnState() {
    if (billInput.value === "" && numberOfPeople.value === "") {
      resetBtn.disabled = true;
      resetBtn.style.background = "#0D686D";
      resetBtn.style.color = "#0A6168;";
    } else {
      resetBtn.disabled = false;
      resetBtn.style.background = "var(--strong-cyan)";
      resetBtn.style.color = "var(--very-dark-cyan)";
    }
  }

  updateResetBtnState();
}

// Input limit number

$("#number-of-people").on("input", function () {
  limitText(this, 10);
});

$("#bill-input").on("input", function () {
  limitText(this, 10);
});

$("#tip-percentage-custom").on("input", function () {
  limitText(this, 5);
});

function limitText(field, maxChar) {
  var ref = $(field),
    val = ref.val();
  if (val.length >= maxChar) {
    ref.val(function () {
      return val.substr(0, maxChar);
    });
  }
}
// Input limit number end
