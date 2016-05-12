/// Code goes here
(function(angular) {

    angular.module('channelsDirective', ['angular.filter'])

    .controller('Controller', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
            $http.get('channels.json')
                .then(function(data) {

                    //load data from JSON file
                    $scope.list = data.data;

                    //filter data by time in reverse order
                    $scope.list = $filter('orderBy')($scope.list, '-time');

                });
            $scope.toLocaleDate = function(e) {
                e.date = e.date.toLocaleDateString();
                return e;
            };
        }])
        .filter('split', function() {
            // split string function
            return function(input, splitIndex) {
                return input.split(" ")[splitIndex];
            }
        })
        .filter('myTime', function myDateFormat($filter) {
            //function to get Time from time node in JSON file
            return function(text) {
                var tempdate = new Date(text.replace(/-/g, "/"));
                return $filter('date')(tempdate, "shortTime");
            }
        })
        .filter('myDate', function myDateFormat($filter) {
            //function to get date from time node
            return function(text) {
                var tempdate = new Date(text.replace(/-/g, "/"));
                return $filter('date')(tempdate, "fullDate");
            }
        })
        .directive('channelList', function() {


            return {
                //add template here
                templateUrl: 'channels.html'

            };
        });

})(window.angular);
