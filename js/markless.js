window.markless = {};

window.markless.Editor = (function() {
  var constructor = function(configuration) {
    this.configuration = configuration;
  };

  var spaceKeyCode = 32;

  var bindEditorEvents = function() {
    this.editorElement.addEventListener('keyup', onKeyup);
  };

  var findEditorElement = function() {
    this.editorElement = document.querySelector(this.configuration.selector);
  };

  var onKeyup = function(event) {
    if (event.keyCode == spaceKeyCode) {
      onSpaceKeyUp.call(this);
    }
  };

  var onSpaceKeyUp = function() {
    var selectedRange = window.getSelection().getRangeAt(0);
    var currentLine = selectedRange.endContainer.data || "";
    var cursorIndex = selectedRange.endOffset;
    var stringBeforeCursor = currentLine.slice(0, cursorIndex);
    if (stringBeforeCursor.slice(0, -1) == '##') {
      console.log('h2');
    } else {
      console.log(JSON.stringify(stringBeforeCursor));
    }
  };

  constructor.prototype.run = function() {
    findEditorElement.call(this);
    bindEditorEvents.call(this);
  };

  return constructor;
})();
