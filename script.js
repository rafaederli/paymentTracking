    // validation: delivery date
    const deliveryDate = document.getElementById("deliveryDate");
    const errorDeliveryDate = document.getElementById("errorDeliveryDate");
    
    deliveryDate.addEventListener("input", () => {
        const deliveryDateValue = new Date(deliveryDate.value);
        deliveryDateValue.setHours(24,0,0,0);
        
        const today = new Date();
        today.setHours(0,0,0,0);
        
        if(deliveryDateValue > today) {
            errorDeliveryDate.style.display = "block";
        } else {
            errorDeliveryDate.style.display = "none";
        }
    });

    // validation: due date
    const dueDate = document.getElementById("dueDate");
    const errorDueDate = document.getElementById("errorDueDate");

    dueDate.addEventListener("input", () => {
        const dueDateValue = new Date(dueDate.value);
        dueDateValue.setHours(24,0,0,0);
        
        const today = new Date();
        today.setHours(0,0,0,0);

        if(dueDateValue <= today) {
            errorDueDate.style.display = "block";
        } else {
            errorDueDate.style.display = "none";
        }
    });

    // validation: value
    const value = document.getElementById("value");
    
    value.addEventListener("input", () => {
        const formattedValue = (
          Number(value.value.replace(/\D/g,""))/100
          ).toLocaleString("pt-BR", {style: "currency",currency:"BRL"});
        
        value.value = formattedValue;
    });

    // input to google spreadsheet
    document.getElementById("button").addEventListener("click", getInfo);
    
    function getInfo() {
      const fields = {
        deliveryDate: document.getElementById("deliveryDate").value,
        merchandiseType: document.getElementById("merchandiseType").value,
        payee: document.getElementById("payee").value,
        dueDate: document.getElementById("dueDate").value,
        value: document.getElementById("value").value
      };

      var missingFields = []
      for(var [field, value] of Object.entries(fields)) {
        if(value == "" || value == "Selecione") {
          switch(field) {
              case "deliveryDate":
              field = "Data da Entrega";
              break;
              case "merchandiseType":
              field = "Tipo de Mercadoria";
              break;
              case "payee":
              field = "Beneficiário";
              break;
              case "dueDate":
              field = "Data do Vencimento";
              break;
              case "value":
              field = "Valor";
              break;
            };
          missingFields.push(field);
        };
      };

      if(missingFields.length > 0) {
        window.alert(`\nAtenção! Preencha os seguintes campos:\n\n · ${missingFields.join("\n · ")}`);
      } else {
      
        var info = {
          payee: fields.payee,
          merchandiseType: fields.merchandiseType,
          value: fields.value,
        };

        // transforming data fields
        const dateFormat = {year: "numeric", month: "2-digit", day: "2-digit"};
        
        const deliveryDate = new Date(fields.deliveryDate);
        deliveryDate.setHours(24,0,0,0);
        info.deliveryDate = deliveryDate.toLocaleString("pt-BR", dateFormat);
        
        const dueDate = new Date(fields.dueDate);
        dueDate.setHours(24,0,0,0);
        info.dueDate = dueDate.toLocaleString("pt-BR", dateFormat);

        // week field
        const dayMilliseconds = (24 * 60 * 60 * 1000);
        
        const weekDay = dueDate.toLocaleString("pt-BR", {weekday: "long"});
        let week;
        const newDate = (n) => new Date(dueDate.getTime() - (n * dayMilliseconds));
        
        switch(weekDay) {
          case "segunda-feira":
            week = dueDate;
            break;
          case "terça-feira":
            week = newDate(1);
            break;
          case "quarta-feira":
            week = newDate(2);
            break;
          case "quinta-feira":
            week = newDate(3);
            break;
          case "sexta-feira":
            week = newDate(4);
            break;
          case "sábado":
            week = newDate(5);
            break;
          case "domingo":
            week = newDate(6);
            break;
        };

        info.week = week.toLocaleString("pt-BR", dateFormat);
        
        // input
        google.script.run.recordSpreadsheet(info);

        // deleting field values
        document.getElementById("deliveryDate").value = "";
        document.getElementById("merchandiseType").value = "Selecione";
        document.getElementById("payee").value = "Selecione";
        document.getElementById("dueDate").value = "";
        document.getElementById("value").value = "";
        
        document.getElementById("errorDeliveryDate").style.display = "none";
        document.getElementById("errorDueDate").style.display = "none";
      };
    };