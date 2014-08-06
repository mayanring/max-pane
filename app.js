(function() {

  function PoopCtrl($scope) {

  };

  angular.module("app", [])
    .controller("PoopController", PoopCtrl)
    .directive("tabs", function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'tabs.html',

        // this is how the directives communicate with each other
        controller: function($scope) {
          var panes = $scope.panes = [];

          $scope.select = function(pane) {
            angular.forEach(panes, function(pane) {
              pane.selected = false;
            });

            pane.selected = true;
          };

          this.addPane = function(pane) {
            if (panes.length === 0) {
              $scope.select(pane);
            }
            panes.push(pane);
          };
        }
      };
    })
  .directive("pane", function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      templateUrl: 'pane.html',
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      }
    };
  });

})();

