window.Markless = (function() {
  var constructor = function(configuration) {
    this.configuration = configuration;
  };

  var spaceKeyCode = 32;

  var bindEditorEvents = function() {
    this.editorElement.addEventListener('keypress', onKeyPress);
  };

  var findEditorElement = function() {
    this.editorElement = document.querySelector(this.configuration.selector);
  };

  var onKeyPress = function(event) {
    if (event.keyCode == spaceKeyCode) {
      onSpaceKeyPress.call(this, event);
    }
  };

  var onSpaceKeyPress = function(event) {
    var currentLine = window.getSelection().getRangeAt(0).endContainer.data || "";
    if (currentLine == '#') {
      document.execCommand('formatblock', false, 'h1');
    } else if (currentLine == '##') {
      document.execCommand('formatblock', false, 'h2');
    } else if (currentLine == '###') {
      document.execCommand('formatblock', false, 'h3');
    } else if (currentLine == '####') {
      document.execCommand('formatblock', false, 'h4');
    } else if (currentLine == '#####') {
      document.execCommand('formatblock', false, 'h5');
    } else if (currentLine == '######') {
      document.execCommand('formatblock', false, 'h6');
    } else if (currentLine == '>') {
      document.execCommand('formatblock', false, 'blockquote');
    } else if (currentLine == '*' || currentLine == '-' || currentLine == '+') {
      document.execCommand('insertUnorderedList');
    } else if (currentLine.match(/^\d+\.$/)) {
      document.execCommand('insertOrderedList');
    } else {
      return;
    }
    event.preventDefault();
    window.getSelection().focusNode.data = "";
  };

  constructor.prototype.run = function() {
    findEditorElement.call(this);
    bindEditorEvents.call(this);
  };

  return constructor;
})();
