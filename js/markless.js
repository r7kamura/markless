window.Markless = (function() {
  var constructor = function(configuration) {
    this.selector = configuration.selector;
  };

  var spaceKeyCode = 32;

  var bindEditorEvents = function() {
    this.editorElement.addEventListener('keypress', onKeyPress);
  };

  var findEditorElement = function() {
    this.editorElement = document.querySelector(this.selector);
  };

  var onKeyPress = function(event) {
    var currentLine = window.getSelection().getRangeAt(0).endContainer.data || "";
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
    } else {
      return;
    }
    window.getSelection().focusNode.data = "";
  };

  constructor.prototype.run = function() {
    findEditorElement.call(this);
    bindEditorEvents.call(this);
  };

  return constructor;
})();
