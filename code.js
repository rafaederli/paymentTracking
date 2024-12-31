const url = "https://docs.google.com/spreadsheets/...";

function doGet() {
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("beneficiarios");
  var payeeList = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();
  template = HtmlService.createTemplateFromFile("main");
  template.payeeList = payeeList.map(function(row) {return row[0]});
  return template.evaluate();
};

function recordSpreadsheet(info) {
  var ss = SpreadsheetApp.openByUrl(url);
  
  var ws = ss.getSheetByName("beneficiarios");
  var payeeData = ws.getRange(1, 1, ws.getLastRow(), 2).getValues();
  var payeeList = payeeData.map(function(row) {return row[0]});
  var expenseList = payeeData.map(function(row) {return row[1]});
  var payeeIndex = payeeList.indexOf(info.payee);
  var expense = expenseList[payeeIndex];

  var ws = ss.getSheetByName("contas a pagar");
  ws.appendRow([info.payee, info.deliveryDate, info.merchandiseType, info.dueDate, info.value, "A Pagar", info.week, expense, new Date()]);
};