define(
  ["hyperagent/config","exports"],
  function(c, __exports__) {
    "use strict";

    function Properties(response, options) {
      // XXX: This function is too large. Let's figure out if we could instead build
      // one large object for defineProperties first and call on that in the end
      // and if that would make the code cleaner.
      options = options || {};
      if (Object(response) !== response) {
        throw new Error('The Properties argument must be an object.');
      }

      var skipped = ['_links', '_embedded'];
      Object.keys(response).forEach(function (key) {
        if (!c._.contains(skipped, key)) {
          this[key] = response[key];
        }
      }.bind(this));

      // Set up curies
      var curies = options.curies;
      if (!curies) {
        return;
      }

      Object.keys(this).forEach(function (key) {
        if (curies.canExpand(key)) {
          Object.defineProperty(this, curies.expand(key), {
            enumerable: true, /// XXX
            value: this[key]
          });
        }
      }.bind(this));
    }


    __exports__.Properties = Properties;
  });