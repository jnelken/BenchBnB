(function (root) {
  var CHANGE_EVENT = "change";
  var _benches = [];
  var resetBenches = function (benches) {
    _benches = benches;
  };

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _benches.slice(0);
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
          resetBenches(payload.benches);
          BenchStore.emit(CHANGE_EVENT);
          break;
        case BenchConstants.BENCH_RECEIVED:
          _benches.push(payload.bench);
          BenchStore.emit(CHANGE_EVENT);
          break;
      }
    })

  });
})(this);
