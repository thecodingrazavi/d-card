const cardholderNameInput = document.getElementById("cardholder-name");
const cardNumberInput = document.getElementById("card-number");
const expiryDateInput = document.getElementById("expiry-date");
const cvcInput = document.getElementById("cvc");
const cardholderNamePreview = document.getElementById(
  "cardholder-name-preview"
);
const cardNumberPreview = document.getElementById("card-number-preview");
const expiryDatePreview = document.getElementById("expiry-date-preview");
const cvcPreview = document.getElementById("cvc-preview");
const errorMessage = document.getElementById("error-message");
const completedState = document.getElementById("completed-state");
const continueButton = document.getElementById("continue-button");
const cardForm = document.getElementById("card-form");
cardholderNameInput.addEventListener("input", updateCardDetails);
cardNumberInput.addEventListener("input", updateCardDetails);
expiryDateInput.addEventListener("input", updateCardDetails);
cvcInput.addEventListener("input", updateCardDetails);

function updateCardDetails() {
  cardholderNamePreview.innerText = cardholderNameInput.value.toUpperCase();
  cardNumberPreview.innerText = cardNumberInput.value.replace(
    /\d(?=\d{4})/g,
    "X"
  );
  expiryDatePreview.innerText = expiryDateInput.value;
  cvcPreview.innerText = cvcInput.value;
}

function highlightError(input, message) {
  const errorId = input.id + "-error";
  const errorMessage = document.getElementById(errorId);
  input.classList.add("error");
  errorMessage.innerText = message;
  errorMessage.classList.add("show");
}

function removeHighlight(input) {
  const errorId = input.id + "-error";
  const errorMessage = document.getElementById(errorId);
  input.classList.remove("error");
  errorMessage.innerText = "";
  errorMessage.classList.remove("show");
}

cardForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let errors = [];

  if (!cardholderNameInput.value.trim()) {
    errors.push({
      input: cardholderNameInput,
      message: "Can't be blank",
    });
  } else {
    removeHighlight(cardholderNameInput);
  }

  const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
  if (!cardNumberPattern.test(cardNumberInput.value.trim())) {
    if (!cardNumberInput.value.trim()) {
      errors.push({
        input: cardNumberInput,
        message: "Can't be blank",
      });
    } else if (!/^\d+$/.test(cardNumberInput.value.trim())) {
      errors.push({
        input: cardNumberInput,
        message: "Wrong format, numbers only",
      });
    } else {
      errors.push({
        input: cardNumberInput,
        message: "Please enter a valid card number (e.g., 1234 5678 9101 1121)",
      });
    }
  } else {
    removeHighlight(cardNumberInput);
  }

  const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryDatePattern.test(expiryDateInput.value.trim())) {
    if (!expiryDateInput.value.trim()) {
      errors.push({
        input: expiryDateInput,
        message: "Can't be blank",
      });
    } else {
      errors.push({
        input: expiryDateInput,
        message: "Please enter a valid expiry date (e.g., MM/YY)",
      });
    }
  } else {
    removeHighlight(expiryDateInput);
  }

  const cvcPattern = /^\d{3}$/;
  if (!cvcPattern.test(cvcInput.value.trim())) {
    if (!cvcInput.value.trim()) {
      errors.push({ input: cvcInput, message: "Can't be blank" });
    } else {
      errors.push({
        input: cvcInput,
        message: "Please enter a valid CVC (e.g., 123)",
      });
    }
  } else {
    removeHighlight(cvcInput);
  }

  if (errors.length > 0) {
    errors.forEach(({ input, message }) => {
      highlightError(input, message);
    });
    return;
  }

  // Show the completed state
  cardForm.style.display = "none";
  completedState.style.display = "block";
});

// Function to reset the form fields
function resetForm() {
  cardholderNameInput.value = "";
  cardNumberInput.value = "";
  expiryDateInput.value = "";
  cvcInput.value = "";
  errorMessage.innerText = "";
  cardholderNameInput.classList.remove("error");
  cardNumberInput.classList.remove("error");
  expiryDateInput.classList.remove("error");
  cvcInput.classList.remove("error");
  cardholderNamePreview.innerText = "Jane Appleased";
  cardNumberPreview.innerText = "0000 0000 0000 0000";
  expiryDatePreview.innerText = "00/00";
  cvcPreview.innerText = "000";
}

continueButton.addEventListener("click", function () {
  // Reset the form
  resetForm();
  cardForm.style.display = "block";
  completedState.style.display = "none";
});

// Clear error message on input change
cardholderNameInput.addEventListener("input", clearErrorMessage);
cardNumberInput.addEventListener("input", clearErrorMessage);
expiryDateInput.addEventListener("input", clearErrorMessage);
cvcInput.addEventListener("input", clearErrorMessage);

function clearErrorMessage() {
  errorMessage.innerText = "";
}
