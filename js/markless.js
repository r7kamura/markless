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
    new Reactor(event, this).react();
  };

  // React to key events.
  var Reactor = (function() {
    var constructor = function(event, markless) {
      this.event = event;
      this.markless = markless;
    };

    constructor.prototype.react = function() {
      if (hasKeydownEvent.call(this)) {
        if (hasEnterKeyCode.call(this)) {
          if (focusingOnQuoteElement.call(this)) {
            insertLineBreak.call(this);
          } else if (hasPreLine.call(this)) {
            insertPreElement.call(this);
          }
        } else if (hasDeleteKeyCode.call(this)) {
          if (getCaretPosition.call(this) == 0 && hasEmptyLine.call(this)) {
            insertDivElement.call(this);
          }
        } else {
          if (hasH1Line.call(this)) {
            insertH1Element.call(this);
          } else if (hasH2Line.call(this)) {
            insertH2Element.call(this);
          } else if (hasH3Line.call(this)) {
            insertH3Element.call(this);
          } else if (hasH4Line.call(this)) {
            insertH4Element.call(this);
          } else if (hasH5Line.call(this)) {
            insertH5Element.call(this);
          } else if (hasH6Line.call(this)) {
            insertH6Element.call(this);
          } else if (hasBlockquoteLine.call(this)) {
            insertBlockquoteElement.call(this);
          } else if (hasOrderedListLine.call(this)) {
            insertOrderedListElement.call(this);
          } else if (hasUnorderedListLine.call(this)) {
            insertUnorderedListElement.call(this);
          }
        }
      }
    };

    var hasKeydownEvent = function() {
      return this.event.type == 'keydown';
    };

    var hasEnterKeyCode = function() {
      return this.event.keyCode == 13;
    };

    var hasDeleteKeyCode = function() {
      return this.event.keyCode == 8;
    };

    var hasPreLine = function() {
      return getCurrentLine.call(this).match(/^```.*$/);
    };

    var hasH1Line = function() {
      return getCurrentLine.call(this) == '#\xA0';
    };

    var hasH2Line = function() {
      return getCurrentLine.call(this) == '##\xA0';
    };

    var hasH3Line = function() {
      return getCurrentLine.call(this) == '###\xA0';
    };

    var hasH4Line = function() {
      return getCurrentLine.call(this) == '####\xA0';
    };

    var hasH5Line = function() {
      return getCurrentLine.call(this) == '#####\xA0';
    };

    var hasH6Line = function() {
      return getCurrentLine.call(this) == '######\xA0';
    };

    var hasBlockquoteLine = function() {
      return getCurrentLine.call(this) == '>\xA0';
    };

    var hasUnorderedListLine = function() {
      return getCurrentLine.call(this).match(/^[\-+*]\xA0$/);
    };

    var hasOrderedListLine = function() {
      return getCurrentLine.call(this).match(/^\d+\.\xA0$/);
    };

    var hasEmptyLine = function() {
      return getCurrentLine.call(this).match(/^\n?$/);
    };

    var focusingOnQuoteElement = function() {
      var element = getFocusedElement.call(this);
      return (element && (element.nodeName == 'PRE' || element.nodeName == 'BLOCKQUOTE'));
    };

    // Get the focused element node recursively because endContainer may return text node.
    var getFocusedElement = function() {
      if (!this.focusedElement) {
        var element = window.getSelection().getRangeAt(0).endContainer;
        while (element && element.parentNode != this.markless.editorElement) {
          element = element.parentNode;
        }
        this.focusedElement = element;
      }
      return this.focusedElement;
    };

    var getCaretPosition = function() {
      var range = window.getSelection().getRangeAt(0);
      var clonedRange = range.cloneRange();
      var focusedElement = getFocusedElement.call(this);
      if (focusedElement) {
        clonedRange.selectNodeContents(focusedElement);
        clonedRange.setEnd(range.endContainer, range.endOffset);
        return clonedRange.toString().length;
      } else {
        return 0;
      }
    };

    var getCurrentLine = function() {
      if (!this.currentLine) {
        this.currentLine = window.getSelection().getRangeAt(0).endContainer.data || '';
      }
      return this.currentLine;
    };

    var clearCurrentLine = function() {
      window.getSelection().focusNode.data = '';
    };

    var insertLineBreak = function() {
      document.execCommand('insertLineBreak');
      this.event.preventDefault();
    };

    var insertPreElement = function() {
      document.execCommand('formatblock', false, 'pre');
      clearCurrentLine.call(this);
      this.event.preventDefault();
    };

    var insertH1Element = function() {
      document.execCommand('formatblock', false, 'h1');
      clearCurrentLine.call(this);
    }

    var insertH2Element = function() {
      document.execCommand('formatblock', false, 'h2');
      clearCurrentLine.call(this);
    }

    var insertH3Element = function() {
      document.execCommand('formatblock', false, 'h3');
      clearCurrentLine.call(this);
    }

    var insertH4Element = function() {
      document.execCommand('formatblock', false, 'h4');
      clearCurrentLine.call(this);
    }

    var insertH5Element = function() {
      document.execCommand('formatblock', false, 'h5');
      clearCurrentLine.call(this);
    }

    var insertH6Element = function() {
      document.execCommand('formatblock', false, 'h6');
      clearCurrentLine.call(this);
    }

    var insertBlockquoteElement = function() {
      document.execCommand('formatblock', false, 'blockquote');
      clearCurrentLine.call(this);
    };

    var insertUnorderedListElement = function() {
      document.execCommand('insertUnorderedList');
      clearCurrentLine.call(this);
    };

    var insertOrderedListElement = function() {
      document.execCommand('insertOrderedList');
      clearCurrentLine.call(this);
    };

    // Because quote element (blockquote or pre) cannot be converted into div by execComamnd,
    // we use leaveFocusedElement method.
    var insertDivElement = function() {
      if (focusingOnQuoteElement.call(this)) {
        leaveFocusedElement.call(this);
      } else {
        document.execCommand('formatblock', false, 'div');
      }
    };

    var createEmptyLineDiv = function() {
      var element = document.createElement('div');
      element.innerHTML = '<br>';
      return element;
    };

    var moveCaretTo = function(element) {
      var range = document.createRange();
      var selection = window.getSelection();
      range.setStart(element, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    var leaveFocusedElement = function() {
      var focusedElement = getFocusedElement.call(this);
      clearCurrentLine.call(this);
      if (focusedElement.innerText == '') {
        this.markless.editorElement.removeChild(focusedElement);
      }
      var element = createEmptyLineDiv.call(this);
      this.markless.editorElement.insertBefore(element, focusedElement);
      moveCaretTo.call(this, element);
    };

    return constructor;
  })();

  return constructor;
})();
