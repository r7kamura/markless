window.Markless = (function() {
  var constructor = function(configuration) {
    this.selector = configuration.selector;
  };

  var bindEditorEvents = function() {
    this.editorElement.addEventListener('keydown', onKeyDown);
  };

  var findEditorElement = function() {
    this.editorElement = document.querySelector(this.selector);
  };

  var focusOnEditor = function() {
    this.editorElement.focus();
  };

  var makeEditorEditable = function() {
    this.editorElement.contentEditable = true;
  };

  var onKeyDown = function(event) {
    var currentLine = getCurrentLine.call(this);
    if (currentLine == '#\xA0') {
      document.execCommand('formatblock', false, 'h1');
    } else if (currentLine == '##\xA0') {
      document.execCommand('formatblock', false, 'h2');
    } else if (currentLine == '###\xA0') {
      document.execCommand('formatblock', false, 'h3');
    } else if (currentLine == '####\xA0') {
      document.execCommand('formatblock', false, 'h4');
    } else if (currentLine == '#####\xA0') {
      document.execCommand('formatblock', false, 'h5');
    } else if (currentLine == '######\xA0') {
      document.execCommand('formatblock', false, 'h6');
    } else if (currentLine == '>\xA0') {
      document.execCommand('formatblock', false, 'blockquote');
    } else if (currentLine == '*\xA0' || currentLine == '-\xA0' || currentLine == '+\xA0') {
      document.execCommand('insertUnorderedList');
    } else if (currentLine.match(/^\d+\.\xA0$/)) {
      document.execCommand('insertOrderedList');
    } else if (event.keyCode == 13 && currentLine.match(/^```.*$/)) {
      document.execCommand('formatblock', false, 'pre');
      event.preventDefault();
    } else {
      return;
    }
    clearCurrentLine.call(this);
  };

  var clearCurrentLine = function() {
    window.getSelection().focusNode.data = "";
  };

  var getCurrentLine = function() {
    return window.getSelection().getRangeAt(0).endContainer.data || "";
  };

  constructor.prototype.run = function() {
    findEditorElement.call(this);
    makeEditorEditable.call(this);
    focusOnEditor.call(this);
    bindEditorEvents.call(this);
  };

  return constructor;
})();
