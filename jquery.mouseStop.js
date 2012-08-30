/*
 * jQuery mouseStop Event v1.0
 * http://richardscarrott.co.uk/posts/view/jquery-mouseStop-event
 *
 * Copyright (c) 2010 Richard Scarrott
 * W/ thanks to Ben Alman for his decent jQuery special event API write up:
 * http://benalman.com/news/2010/03/jquery-special-events/
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Requires jQuery v1.3+
 *
 */

(function($) {
  // public vars
  $.mouseStopDelay = 0;

  // special event
  $.event.special.mouseStop = {
    setup: function(data) {
      $(this).data('mouseStop', {delay: data})
      .bind('mouseenter.mouseStop', mouseenterHandler)
      .bind('mouseleave.mouseStop', mouseleaveHandler);
    },
    teardown: function() {
      $(this).removeData('mouseStop')
      .unbind('.mouseStop');
    }
  };

  // private methods
  function mouseenterHandler() {
    if (typeof this.timeout === 'undefined') {
      this.timeout = null;
    }

    var elem = $(this),
    data = elem.data('mouseStop'),
    delay = data.delay || $.mouseStopDelay;

    elem.bind('mousemove.mouseStop', function() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        elem.trigger('mouseStop');
      }, delay);
    });
  };

  function mouseleaveHandler() {
    var elem = $(this);
    elem.unbind('mousemove.mouseStop');
    clearTimeout(this.timeout);
  };

  // shorthand alias
  $.fn.mouseStop = function(data, fn) {
    if (fn == null) {
      fn = data;
      data = null;
    }

    return arguments.length > 0 ? this.bind('mouseStop', data, fn) : this.trigger('mouseStop');
  };
})(jQuery);
