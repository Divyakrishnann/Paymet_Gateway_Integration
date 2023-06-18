'use strict';

var _require = require('../utils/razorpay-utils');

var normalizeDate = _require.normalizeDate;


module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var callback = arguments[1];
      var from = params.from;
      var to = params.to;
      var count = params.count;
      var skip = params.skip;
      var payment_id = params.payment_id;

      var url = '/refunds';

      if (payment_id) {
        url = '/payments/' + payment_id + '/refunds';
      }

      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get({
        url: url,
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip
        }
      }, callback);
    },
    fetch: function fetch(refundId) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var callback = arguments[2];
      var payment_id = params.payment_id;

      if (!refundId) {
        throw new Error('`refund_id` is mandatory');
      }

      var url = '/refunds/' + refundId;

      if (payment_id) {
        url = '/payments/' + payment_id + url;
      }

      return api.get({
        url: url
      }, callback);
    }
  };
};