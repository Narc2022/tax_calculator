$(document).ready(function () {
  function showErrorIcon(element, message) {
    let icon = $(element).parent().find(".info-icon");
    icon.attr("data-original-title", message);
    $(element).siblings(".error-icon").text(message);
  }
  function calculateTax(grossIncome, extraIncome, ageGroup, deductions) {
    let totalIncome =
      parseFloat(grossIncome) +
      parseFloat(extraIncome) -
      parseFloat(deductions);

    // Check if total income is less than or equal to 8 lakhs
    if (totalIncome <= 800000) {
      return 0; // No tax
    } else {
      // Calculate tax based on age group
      let taxRate = 0;
      if (ageGroup === "<40") {
        taxRate = 0.3;
      } else if (ageGroup === "40-60") {
        taxRate = 0.4;
      } else if (ageGroup === "≥60") {
        taxRate = 0.1;
      }
      // Calculate tax on income over 8 lakhs
      return taxRate * (totalIncome - 800000);
    }
  }

  // Function to show result modal
  function showResultModal(taxAmount) {
    $("#resultBody").text(`Tax Amount: ${taxAmount.toFixed(2)} Lakhs`);
    $("#resultModal").modal("show");
  }

  // Function to validate input fields
  function validateInput() {
    let isValid = true;
    // Validate gross annual income
    let grossIncome = $("#grossIncome").val();

    if (grossIncome.trim() === "") {
      $("#grossIncomeError").css("display", "flex");

      isValid = false;
    } else if (isNaN(grossIncome) || parseFloat(grossIncome) <= 0) {
      $("#grossIncomeError").css("display", "flex");
      isValid = false;
    } else {
      $("#grossIncomeError").css("display", "none");
    }
    // Validate extra income
    let extraIncome = $("#extraIncome").val();
    if (extraIncome.trim() === "") {
      $("#extraIncomeError").css("display", "flex");
      isValid = false;
    } else if (isNaN(extraIncome) || parseFloat(extraIncome) < 0) {
      $("#extraIncomeError").css("display", "flex");
      isValid = false;
    } else {
      $("#extraIncomeError").css("display", "none");
    }
    // Validate age group
    let ageGroup = $("#ageGroup").val();
    if (ageGroup.trim() === "") {
      $("#ageGroupError").text("Please select an age group.");
      isValid = false;
    } else if (!["<40", "40-60", "≥60"].includes(ageGroup)) {
      $("#ageGroupError").text("Please select a valid age group.");
      isValid = false;
    } else {
      $("#ageGroupError").text("");
    }
    // Validate deductions
    let deductions = $("#deductions").val();
    if (deductions.trim() === "") {
      $("#deductionsError").css("display", "flex");
      isValid = false;
    } else if (isNaN(deductions) || parseFloat(deductions) < 0) {
      $("#deductionsError").css("display", "flex");
      isValid = false;
    } else {
      $("#deductionsError").css("display", "none");
    }
    return isValid;
  }

  // Submit button click event
  $("#submitBtn").click(function () {
    // Validate input fields
    if (!validateInput()) {
      return; // Don't proceed if validation fails
    }
    // Get input values
    let grossIncome = $("#grossIncome").val();
    let extraIncome = $("#extraIncome").val();
    let ageGroup = $("#ageGroup").val();
    let deductions = $("#deductions").val();
    // Calculate tax
    let taxAmount = calculateTax(
      grossIncome,
      extraIncome,
      ageGroup,
      deductions
    );
    // Show result modal
    if (grossIncome && extraIncome && ageGroup && deductions) {
      showResultModal(taxAmount);
    } else {
    }
  });
});
