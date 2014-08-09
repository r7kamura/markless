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
      onSpaceKeyPress.call(this);
    }
  };

  var onSpaceKeyPress = function() {
    var selectedRange = window.getSelection().getRangeAt(0);
    var currentLine = selectedRange.endContainer.data || "";
    var cursorIndex = selectedRange.endOffset;
    var stringBeforeSpace = currentLine.slice(0, cursorIndex);
    if (stringBeforeSpace == '#') {
      document.execCommand('formatblock', false, 'h1');
    } else if (stringBeforeSpace == '##') {
      document.execCommand('formatblock', false, 'h2');
    } else if (stringBeforeSpace == '###') {
      document.execCommand('formatblock', false, 'h3');
    } else if (stringBeforeSpace == '####') {
      document.execCommand('formatblock', false, 'h4');
    } else if (stringBeforeSpace == '#####') {
      document.execCommand('formatblock', false, 'h5');
    } else if (stringBeforeSpace == '######') {
      document.execCommand('formatblock', false, 'h6');
    } else if (stringBeforeSpace == '*' || stringBeforeSpace == '-') {
      // TODO
    }
  };

  constructor.prototype.run = function() {
    findEditorElement.call(this);
    bindEditorEvents.call(this);
  };

  return constructor;
})();
