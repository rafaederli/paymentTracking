// Delivery Date Validation
const deliveryDateInput = document.getElementById("deliveryDate");
const errorDeliveryDate = document.getElementById("errorDeliveryDate");
deliveryDateInput.addEventListener("input", () => {
    const deliveryDate = new Date(deliveryDateInput.value);
    const today = new Date();
    deliveryDate.setHours(24,0,0,0);
    today.setHours(0,0,0,0);
    if(deliveryDate < today) {
        errorDeliveryDate.style.display = "block";
    } else {
        errorDeliveryDate.style.display = "none";
    }
});
// Due Date Validation
const dueDateInput = document.getElementById("dueDate");
const errorDueDate = document.getElementById("errorDueDate");
dueDateInput.addEventListener("input", () => {
    const dueDate = new Date(dueDateInput.value);
    const today = new Date();
    dueDate.setHours(24,0,0,0);
    today.setHours(0,0,0,0);
    if(dueDate <= today) {
        errorDueDate.style.display = "block";
    } else {
        errorDueDate.style.display = "none";
    }
});
// Value Validation
const valueInput = document.getElementById("value");
valueInput.addEventListener("input", () => {
    let value = valueInput.value;
    value = value.replace(/\D/g,"");
    const formattedValue = (Number(value)/100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    valueInput.value = formattedValue;
});