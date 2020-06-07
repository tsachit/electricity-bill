$( document ).ready(function() {
  var lockdownDiscountPercent = 25;
  $("#lockdowndiscountlabel").html(lockdownDiscountPercent);
  var tariff = {
      5: [
          { min: 0, max: 20, rangeText: '0 - 20', serviceCharge: 30.00, energyCharge: 3.00 },
          { min: 20, max: 30, rangeText: '21 - 30', serviceCharge: 50.00, energyCharge: 7.00 },
          { min: 30, max: 50, rangeText: '31 - 50', serviceCharge: 75.00, energyCharge: 8.50 },
          { min: 50, max: 150, rangeText: '51 - 150', serviceCharge: 100.00, energyCharge: 10.00 },
          { min: 150, max: 250, rangeText: '151 - 250', serviceCharge: 125.00, energyCharge: 11.00 },
          { min: 250, max: 400, rangeText: '251 - 400', serviceCharge: 150.00, energyCharge: 12.00 },
          { min: 400, max: null, rangeText: 'Above 400', serviceCharge: 175.00, energyCharge: 13.00 }
      ],
      15: [
          { min: 0, max: 20, rangeText: '0 - 20', serviceCharge: 50.00, energyCharge: 4.00 },
          { min: 20, max: 30, rangeText: '21 - 30', serviceCharge: 75.00, energyCharge: 7.00 },
          { min: 30, max: 50, rangeText: '31 - 50', serviceCharge: 100.00, energyCharge: 8.50 },
          { min: 50, max: 150, rangeText: '51 - 150', serviceCharge: 125.00, energyCharge: 10.00 },
          { min: 150, max: 250, rangeText: '151 - 250', serviceCharge: 150.00, energyCharge: 11.00 },
          { min: 250, max: 400, rangeText: '251 - 400', serviceCharge: 175.00, energyCharge: 12.00 },
          { min: 400, max: null, rangeText: 'Above 400', serviceCharge: 200.00, energyCharge: 13.00 }
      ],
      30: [
          { min: 0, max: 20, rangeText: '0 - 20', serviceCharge: 75.00, energyCharge: 5.00 },
          { min: 20, max: 30, rangeText: '21 - 30', serviceCharge: 100.00, energyCharge: 7.00 },
          { min: 30, max: 50, rangeText: '31 - 50', serviceCharge: 125.00, energyCharge: 8.50 },
          { min: 50, max: 150, rangeText: '51 - 150', serviceCharge: 150.00, energyCharge: 10.00 },
          { min: 150, max: 250, rangeText: '151 - 250', serviceCharge: 175.00, energyCharge: 11.00 },
          { min: 250, max: 400, rangeText: '251 - 400', serviceCharge: 200.00, energyCharge: 12.00 },
          { min: 400, max: null, rangeText: 'Above 400', serviceCharge: 225.00, energyCharge: 13.00 }
      ],
      60: [
          { min: 0, max: 20, rangeText: '0 - 20', serviceCharge: 125.00, energyCharge: 6.00 },
          { min: 20, max: 30, rangeText: '21 - 30', serviceCharge: 150.00, energyCharge: 7.00 },
          { min: 30, max: 50, rangeText: '31 - 50', serviceCharge: 175.00, energyCharge: 8.50 },
          { min: 50, max: 150, rangeText: '51 - 150', serviceCharge: 200.00, energyCharge: 10.00 },
          { min: 150, max: 250, rangeText: '151 - 250', serviceCharge: 225.00, energyCharge: 11.00 },
          { min: 250, max: 400, rangeText: '251 - 400', serviceCharge: 250.00, energyCharge: 12.00 },
          { min: 400, max: null, rangeText: 'Above 400', serviceCharge: 275.00, energyCharge: 13.00 }
      ]
  }

  $( "#ampere, #discount, #units, #lockdowndiscount" ).change(function() {
      clearCalculation();
      var ampere = $("#ampere").val();
      var totalUnits = parseInt($("#units").val());
      var discount = parseInt($("#discount").val());

      console.log(totalUnits, typeof totalUnits, );
      if( ampere == '' || Object.is(totalUnits, NaN) || totalUnits <= 0 || !tariff.hasOwnProperty(ampere))
          return

      var totalCharge = 0;
      var unitRangeCharge = 0;
      var finalServiceCharge = 0;
      var selectedPlan = tariff[ampere];
      selectedPlan.forEach(function myFunction(value) {
          var { min, max, energyCharge, serviceCharge, rangeText } = value;
          var maxValue = ( max === null) ? totalUnits : max;
          var consumedUnits = totalUnits;
          if((totalUnits >= maxValue && max !== null) || (totalUnits > min && totalUnits <= maxValue)) {
              var units = maxValue - min;
              // when reached to category
              if(totalUnits <= maxValue) {
                  units = consumedUnits - min;
              }

              consumedUnits -= units;
              unitRangeCharge = units * parseFloat(value.energyCharge, 10);
              totalCharge += unitRangeCharge;
              finalServiceCharge = serviceCharge;
              $("#bill-listing").append(addListItem(serviceCharge, rangeText, units, energyCharge, unitRangeCharge))
          }
      });
      displayTotal(finalServiceCharge, totalUnits, discount, totalCharge);
  });

  // reset the fields
  $( "#reset" ).click(clearForm);

  function addListItem(serviceCharge, rangeText, units, energyCharge, unitRangeCharge) {
      return `<div class="row d-flex list-unstyled-item list-hours-item">
          <div class="col">Rs. ${serviceCharge}</div>
          <div class="col">${rangeText}</div>
          <div class="col">${units}</div>
          <div class="col">${energyCharge}</div>
          <div class="col">Rs. ${unitRangeCharge}</div>
      </div>`;
  }

  function addTotalListing(finalServiceCharge, totalUnits, totalCharge) {
      return `<div class="col">Final Service Charge: Rs. ${finalServiceCharge}</div>
              <div class="col">Total</div>
              <div class="col">${totalUnits}</div>
              <div class="col"></div>
              <div class="col">Rs. ${totalCharge}</div>`;
  }

  function displayTotal(finalServiceCharge, totalUnits, discount, totalCharge){
      $("#bill-heading").show();
      $("#total-listing").html(addTotalListing(finalServiceCharge, totalUnits, totalCharge));
      $("#grand-total").html(addGrandTotal(totalCharge, discount, finalServiceCharge));
  }

  function addGrandTotal(totalUnitCharge, discount, finalServiceCharge) {
      var htmlContent = `<p><strong>Meter Charge: </strong>Rs. ${totalUnitCharge}</p>`;

      // lockdown discount
      if($("#lockdowndiscount").prop("checked") == true && lockdownDiscountPercent > 0){
          console.log("Lockdown discount is given.");
          var lockdownDiscountAmount = (totalUnitCharge * (lockdownDiscountPercent/100)).toFixed(2);
          var totalUnitCharge = totalUnitCharge - lockdownDiscountAmount;
          htmlContent = `${htmlContent}
              <p><strong>Lockdown discount(${lockdownDiscountPercent}%): </strong>Rs. ${lockdownDiscountAmount}</p>
              <p><strong>Total Meter Charge: </strong>Rs. ${totalUnitCharge}</p><br/>`;
      }

      // rebate discount
      if(discount > 0){
          console.log("Rebate discount is given.");
          var discountAmount = (totalUnitCharge * (discount/100)).toFixed(2);
          var totalUnitCharge = totalUnitCharge - discountAmount;
          htmlContent = `${htmlContent}
              <p><strong>Rebate discount(${discount}%): </strong>Rs. ${discountAmount}</p>
              <p><strong>Total Meter Charge: </strong>Rs. ${totalUnitCharge}</p><br/>`;
      }

      return `${htmlContent}
              <p><strong>Service Charge: </strong>Rs. ${finalServiceCharge}</p>
              <p><strong>Total Charge: </strong>Rs. ${totalUnitCharge + finalServiceCharge}</p>`;
  }

  function clearForm() {
      $("#ampere").val(15);
      $("#discount").val('');
      $("#lockdowndiscount").prop("checked", true);
      $("#units").val('');
      clearCalculation();
  }

  function clearCalculation() {
      $("#bill-heading").hide();
      $("#bill-listing").html('');
      $("#total-listing").html('');
      $("#grand-total").html('');
  }
});