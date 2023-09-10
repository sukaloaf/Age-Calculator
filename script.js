const dayInputLength = document.getElementById("dayInput");
const monthInputLength = document.getElementById("monthInput");
const yearInputLength = document.getElementById("yearInput");
const dayTopText = document.querySelector(".dayTopText");
const monthTopText = document.querySelector(".monthTopText");
const yearTopText = document.querySelector(".yearTopText");
const errorBottomText = document.querySelector(".errorText");
const inputDayBorder = document.querySelector("#dayInput");
const inputMonthBorder = document.querySelector("#monthInput");
const inputYearBorder = document.querySelector("#yearInput");
const errorDayInput = document.querySelector(".errorDayInput");
const errorMonthInput = document.querySelector(".errorMonthInput");
const errorYearInput = document.querySelector(".errorYearInput");
const calculateButton = document.getElementById("btn");

// Function to limit the input fields to their respective character limits
function limitInputCharacters(inputElement, maxLength) {
  const inputValue = inputElement.value;
  if (inputValue.length > maxLength) {
    inputElement.value = inputValue.slice(0, maxLength);
  }
}

dayInputLength.addEventListener("input", function () {
  limitInputCharacters(dayInput, 2);
});

monthInputLength.addEventListener("input", function () {
  limitInputCharacters(monthInput, 2);
});

yearInputLength.addEventListener("input", function () {
  limitInputCharacters(yearInputLength, 4);
});

// Function that changes font and border to red for invalid date length
function lengthError() {
  dayTopText.style.color = "#ea595f";
  monthTopText.style.color = "#ea595f";
  yearTopText.style.color = "#ea595f";
  inputDayBorder.style.borderColor = "#ea595f";
  inputMonthBorder.style.borderColor = "#ea595f";
  inputYearBorder.style.borderColor = "#ea595f";
  errorBottomText.style.display = "flex";
  errorDayInput.innerHTML = "This field is required";
  errorMonthInput.innerHTML = "This field is required";
  errorYearInput.innerHTML = "This field is required";
}

// Function that changes font and border if given a date that doesn't exist
function dateError() {
  dayTopText.style.color = "#ea595f";
  monthTopText.style.color = "#ea595f";
  yearTopText.style.color = "#ea595f";
  inputDayBorder.style.borderColor = "#ea595f";
  inputMonthBorder.style.borderColor = "#ea595f";
  inputYearBorder.style.borderColor = "#ea595f";
  errorBottomText.style.display = "flex";
  errorDayInput.innerHTML = "Must be a valid day";
  errorMonthInput.innerHTML = "Must be a valid month";
  errorYearInput.innerHTML = "must be in the past";
}

// Resets to default style that the Errors have changeed
function resetError() {
  dayTopText.style.color = "#707070";
  monthTopText.style.color = "#707070";
  yearTopText.style.color = "#707070";
  inputDayBorder.style.borderColor = "#dddddd";
  inputMonthBorder.style.borderColor = "#dddddd";
  inputYearBorder.style.borderColor = "#dddddd";
  errorBottomText.style.display = "none";
}

function calculateAge() {
  // Get input values for day, month, and year
  const dayInput = parseInt(document.getElementById("dayInput").value);
  const monthInput = parseInt(document.getElementById("monthInput").value);
  const yearInput = parseInt(document.getElementById("yearInput").value);

  // Get current date
  const currentDate = new Date();

  // Calculate the current year, month, and day
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Month is 0-based
  const currentDay = currentDate.getDate();

  // Calculate the age
  let ageYears = currentYear - yearInput;
  let ageMonths = currentMonth - monthInput;
  let ageDays = currentDay - dayInput;

  // Invalid Date
  if (
    dayInputLength.value.length == 0 ||
    monthInputLength.value.length == 0 ||
    yearInputLength.value.length == 0
  ) {
    lengthError();
  } else if (dayInput > 31 || monthInput > 12 || yearInput > currentYear) {
    dateError();
  } else if (dayInput == 0 || monthInput == 0) {
    dateError();
  } else {
    resetError();
    // Adjust for negative values in months and days
    if (ageDays < 0) {
      ageMonths--;
      const daysInLastMonth = new Date(
        currentYear,
        currentMonth - 1,
        0
      ).getDate();
      ageDays += daysInLastMonth;
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    // Update the age output
    document.getElementById("yearOutput").textContent = ageYears;
    document.getElementById("monthOutput").textContent = ageMonths;
    document.getElementById("dayOutput").textContent = ageDays;
  }
}

calculateButton.addEventListener("click", calculateAge);
