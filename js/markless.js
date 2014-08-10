window.Markless = (function() {
  var constructor = function(configuration) {
    this.selector = configuration.selector;
  };

  constructor.prototype.run = function() {
    findEditorElement.call(this);
    makeEditorEditable.call(this);
    focusOnEditor.call(this);
    bindEditorEvents.call(this);
  };

  var enterKeyCode = 13;

  var bindEditorEvents = function() {
    var self = this;
    this.editorElement.addEventListener('keydown', function(event) {
      onKeyDown.call(self, event);
    });
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
    if (event.keyCode == enterKeyCode) {
      onEnterKeyDown.call(this, event);
    } else {
      onOtherKeyDown.call(this, event);
    }
  };

  var onOtherKeyDown = function(event) {
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
    } else {
      return;
    }
    clearCurrentLine.call(this);
  };

  var onEnterKeyDown = function(event) {
    var focusedElementName = getFocusedElement.call(this).nodeName;
    if (focusedElementName == 'PRE' || focusedElementName == 'BLOCKQUOTE') {
      document.execCommand('insertLineBreak');
    } else if (getCurrentLine.call(this).match(/^```.*$/)) {
      document.execCommand('formatblock', false, 'pre');
      clearCurrentLine.call(this);
    } else {
      return;
    }
    event.preventDefault();
  };

  var clearCurrentLine = function() {
    window.getSelection().focusNode.data = "";
  };

  var getCurrentLine = function() {
    return window.getSelection().getRangeAt(0).endContainer.data || "";
  };

  // Get the focused element node recursively because endContainer may return text node.
  var getFocusedElement = function() {
    var element = window.getSelection().getRangeAt(0).endContainer;
    while (element && element.parentNode != this.editorElement) {
      element = element.parentNode;
    }
    return element;
  };

  return constructor;
})();
