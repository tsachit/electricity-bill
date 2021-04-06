$( document ).ready(function() {
  var tariff = {
      5: [
          { min: 0, max: 10, rangeText: '0 - 10', minimumCharge: 30.00, energyCharge: 0.00, },
          { min: 10, max: 20, rangeText: '11 - 20', minimumCharge: 30.00, energyCharge: 3.00, },
          { min: 20, max: 30, rangeText: '21 - 30', minimumCharge: 50.00, energyCharge: 6.50, },
          { min: 30, max: 50, rangeText: '31 - 50', minimumCharge: 50.00, energyCharge: 8.00, },
          { min: 50, max: 100, rangeText: '51 - 100', minimumCharge: 75.00, energyCharge: 9.50, },
          { min: 100, max: 150, rangeText: '101 - 150', minimumCharge: 100.00, energyCharge: 9.50, },
          { min: 150, max: 250, rangeText: '151 - 250', minimumCharge: 125.00, energyCharge: 10.00, },
          { min: 250, max: 400, rangeText: '251 - 400', minimumCharge: 150.00, energyCharge: 11.00, },
          { min: 400, max: null, rangeText: 'Above 400', minimumCharge: 175.00, energyCharge: 12.00, },
      ],
      15: [
          { min: 0, max: 10, rangeText: '0 - 10', minimumCharge: 50.00, energyCharge: 4.00, },
          { min: 10, max: 20, rangeText: '11 - 20', minimumCharge: 50.00, energyCharge: 4.00, },
          { min: 20, max: 30, rangeText: '21 - 30', minimumCharge: 75.00, energyCharge: 6.50, },
          { min: 30, max: 50, rangeText: '31 - 50', minimumCharge: 75.00, energyCharge: 8.00, },
          { min: 50, max: 100, rangeText: '51 - 100', minimumCharge: 100.00, energyCharge: 9.50, },
          { min: 100, max: 150, rangeText: '101 - 150', minimumCharge: 125.00, energyCharge: 9.50, },
          { min: 150, max: 250, rangeText: '151 - 250', minimumCharge: 150.00, energyCharge: 10.00, },
          { min: 250, max: 400, rangeText: '251 - 400', minimumCharge: 175.00, energyCharge: 11.00, },
          { min: 400, max: null, rangeText: 'Above 400', minimumCharge: 200.00, energyCharge: 12.00, },
      ],
      30: [
          { min: 0, max: 10, rangeText: '0 - 10', minimumCharge: 75.00, energyCharge: 5.00, },
          { min: 10, max: 20, rangeText: '11 - 20', minimumCharge: 75.00, energyCharge: 5.00, },
          { min: 20, max: 30, rangeText: '21 - 30', minimumCharge: 100.00, energyCharge: 6.50, },
          { min: 30, max: 50, rangeText: '31 - 50', minimumCharge: 100.00, energyCharge: 8.00, },
          { min: 50, max: 100, rangeText: '51 - 100', minimumCharge: 125.00, energyCharge: 9.50, },
          { min: 100, max: 150, rangeText: '101 - 150', minimumCharge: 150.00, energyCharge: 9.50, },
          { min: 150, max: 250, rangeText: '151 - 250', minimumCharge: 175.00, energyCharge: 10.00, },
          { min: 250, max: 400, rangeText: '251 - 400', minimumCharge: 200.00, energyCharge: 11.00, },
          { min: 400, max: null, rangeText: 'Above 400', minimumCharge: 225.00, energyCharge: 12.00, },
      ],
      60: [
          { min: 0, max: 10, rangeText: '0 - 10', minimumCharge: 125.00, energyCharge: 6.00, },
          { min: 10, max: 20, rangeText: '11 - 20', minimumCharge: 125.00, energyCharge: 6.00, },
          { min: 20, max: 30, rangeText: '21 - 30', minimumCharge: 125.00, energyCharge: 6.50, },
          { min: 30, max: 50, rangeText: '31 - 50', minimumCharge: 125.00, energyCharge: 8.00, },
          { min: 50, max: 100, rangeText: '51 - 100', minimumCharge: 150.00, energyCharge: 9.50, },
          { min: 100, max: 150, rangeText: '101 - 150', minimumCharge: 200.00, energyCharge: 9.50, },
          { min: 150, max: 250, rangeText: '151 - 250', minimumCharge: 200.00, energyCharge: 10.00, },
          { min: 250, max: 400, rangeText: '251 - 400', minimumCharge: 250.00, energyCharge: 11.00, },
          { min: 400, max: null, rangeText: 'Above 400', minimumCharge: 275.00, energyCharge: 12.00, },
      ]
  }

  $( "#ampere, #rebpen, #units, #penalty" ).change(function() {
      clearCalculation();
      var ampere = $("#ampere").val();
      var totalUnits = parseInt($("#units").val());
      var rebpen = parseInt($("#rebpen").val());

      if( ampere == '' || Object.is(totalUnits, NaN) || totalUnits <= 0 || !tariff.hasOwnProperty(ampere))
          return

      var totalCharge = 0;
      var unitRangeCharge = 0;
      var finalMinimumCharge = 0;
      var selectedPlan = tariff[ampere];
      selectedPlan.forEach(function myFunction(value) {
          var { min, max, energyCharge, minimumCharge, rangeText } = value;
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
              finalMinimumCharge = minimumCharge;
              $("#bill-listing").append(addListItem(minimumCharge, rangeText, units, energyCharge, unitRangeCharge))
          }
      });
      displayTotal(finalMinimumCharge, totalUnits, rebpen, totalCharge);
  });

  // reset the fields
  $( "#reset" ).click(clearForm);

  function addListItem(minimumCharge, rangeText, units, energyCharge, unitRangeCharge) {
      return `<div class="row d-flex list-unstyled-item list-hours-item">
          <div class="col">Rs. ${minimumCharge}</div>
          <div class="col">${rangeText}</div>
          <div class="col">${units}</div>
          <div class="col">${energyCharge}</div>
          <div class="col right">Rs. ${unitRangeCharge}</div>
      </div>`;
  }

  function addTotalListing(finalMinimumCharge, totalUnits, totalCharge) {
      return `<div class="col">Final Minimum Charge: Rs. ${finalMinimumCharge}</div>
              <div class="col">Total</div>
              <div class="col">${totalUnits}</div>
              <div class="col"></div>
              <div class="col right">Rs. ${totalCharge}</div>`;
  }

  function displayTotal(finalMinimumCharge, totalUnits, rebpen, totalCharge){
      $("#bill-heading").show();
      $("#total-listing").html(addTotalListing(finalMinimumCharge, totalUnits, totalCharge));
      $("#grand-total").html(addGrandTotal(totalCharge, rebpen, finalMinimumCharge));
  }

  function addGrandTotal(totalUnitCharge, rebpen, finalMinimumCharge) {
      var totalCharge = totalUnitCharge + finalMinimumCharge;
      var htmlContent = `<p><strong>Meter Charge: </strong>Rs. ${totalUnitCharge}</p>
                         <p><strong>Minimum Charge: </strong>Rs. ${finalMinimumCharge}</p>
                         <p><strong>Total Charge: </strong>Rs. ${totalCharge}</p>`;

      // rebate / penalty 
      if(rebpen > 0){
        console.log($("#penalty").prop("checked"), typeof $("#penalty").prop("checked") );
          var rebpenAmount = (totalCharge * (rebpen/100)).toFixed(2);
          totalCharge = $("#penalty").prop("checked") ? totalCharge + rebpenAmount : totalCharge - rebpenAmount;
          htmlContent = `${htmlContent} <hr/>
              <p><strong>${$("#penalty").prop("checked")?'Penalty percentage (+':'Rebate discount (-'}${rebpen}%): </strong>Rs. ${rebpenAmount}</p>
              <p><strong>Total Meter Charge: </strong>Rs. ${totalCharge}</p><br/>`;
      }

      return htmlContent;
  }

  function clearForm() {
      $("#ampere").val(15);
      $("#rebpen").val('');
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