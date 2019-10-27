function onInstall() {
  onOpen();
}

function onOpen() {
  DocumentApp.getUi()
      .createMenu('Custom Menu')
      .addItem('Display', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Word Count Goal Tracker')
      .setWidth(300);
  DocumentApp.getUi()
      .showSidebar(html)
  setProperty('START_SESSION_WORDS', getWordCount());
}

function getWordCount() {
  const text = DocumentApp.getActiveDocument().getBody().getText();
  const words = text.match(/\S+/g);
  return words ? words.length : 0;
}

function getWordCountSession() {
  return getWordCount() - getProperty('START_SESSION_WORDS');
}

function getProperty(key) {
  const documentProperties = PropertiesService.getDocumentProperties();
  return parseInt(documentProperties.getProperty(key));
}

function setProperty(key, value) {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperty(key, value);
}

function setOverallGoal(value) {
  setProperty("OVERALL_GOAL", value)
}

function getPercentComplete(word_count,goal) {
  var result = word_count/goal || 0;
  var percent = result *100;
  return percent.toFixed(2);
}

function getOverallPercentComplete(key) {
  return getPercentComplete(getWordCount(),getProperty("OVERALL_GOAL"));
}

function getSessionPercentComplete(key) {
  return getPercentComplete(getWordCountSession(),getProperty("SESSION_GOAL"));
}
