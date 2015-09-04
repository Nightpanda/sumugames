var sumuServices = angular.module('sumuServices', ['ngResource']);
//var gitServices2 = angular.module('gitServices2', ['ngResource']);
//A factory that will take handling requests from controllers and deliver them onwards
sumuServices.factory('blogApi', ['$resource',
	function($resource) {
		//return $resource('public/blogs/:postId', {}, {
		return $resource('http://192.168.51.73:8080/blogs/:postId', {}, {
		//return $resource('http:/sumugames.com/blogs/:postId', {}, {
		//return $resource('http://192.168.51.73:8080/public/users/:user',{}, {
			query: {
				method:'GET', 
				params:{
					postId: 'blogIndex'
				}, 
				isArray:true,
			},
			update: {
				method:'PUT'				
			},
		});
	}]);


sumuServices.factory('gameApi', ['$resource',
	function($resource) {
	return $resource('http://192.168.51.73:8080/games/:gameName', {}, {
	//return $resource('http://sumugames.com/games/:gameName', {}, {
		//return $resource('http://192.168.51.73:8080/public/users/:user',{}, {
			query: {
				method:'GET', 
				params:{
					gameName: 'gameIndex'
				}, 
				isArray:true,
			},
			update: {
				method:'PUT'				
			},
		});
	}]);
