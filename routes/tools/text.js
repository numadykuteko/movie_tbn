module.exports = {
  escapeHTML: function(unsafe) {
    return unsafe.replace(/[&<"']/g, function(m) {
      switch (m) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '"':
          return '&quot;';
        default:
          return '&#039;';
      }
    });
  }
}