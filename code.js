function doGet() {
  var url = "https://docs.google.com/spreadsheets/d/1IhK1gK7rxyZ6UYoEm3ejQOebBxD-P1HT_djoZBnxKrQ/edit?gid=1768275107#gid=1768275107";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("beneficiarios");
  var list = ws.getRange(1, 1, ws.getRange("A1").getDataRegion().getLastRow(), 1).getValues();
  template = HtmlService.createTemplateFromFile("main");
  template.list = list.map(function(row) {return row[0]});
  return template.evaluate();
}