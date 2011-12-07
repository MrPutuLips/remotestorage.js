define(function(require, exports, module) {
  exports.go = function() {
    //before doing anything else, display a spinner:
    (function() {
      var spinner = document.createElement('img');
      spinner.setAttribute('id', 'remoteStorageSpinner');
      spinner.setAttribute('src', 'http://unhosted.nodejitsu.com/spinner.gif');
      document.body.insertBefore(spinner, document.body.firstChild);
    })();
    require(['controller'], function(controller) {
      var config = {
        jsFileName: 'remoteStorage.js',
        modulesFilePath: 'http://unhosted.nodejitsu.com/'
      };

      //require('http://browserid.org/include.js');

      var scripts = document.getElementsByTagName('script');
      for(var i=0; i < scripts.length; i++) {
        if((new RegExp(config.jsFileName+'$')).test(scripts[i].src)) {
          var options = (new Function('return ' + scripts[i].innerHTML.replace(/\n|\r/g, '')))();
          controller.onLoad(options);
        }
      }

      window.remoteStorage = {
        syncNow: function() {
          return require('controller').trigger('syncNow');
        },
        configure: function(obj) {
          return require('controller').configure(obj);
        }
      }
    });
  };
});

(function() {
  require(['main'], function(main) {
    main.go();
  });
})();
