// angularApp.js
var sumuRouter = angular.module('sumuRouter', ['ui.router', 'sumuServices', 'ngAnimate', 'anim-in-out'])//, 'angularUtils.directives.dirDisqus']) //'angularUtils.directives.dirDisqus'
.config([
'$stateProvider',
'$urlRouterProvider',

//'$locationProvider',

//'$locationProvider.hashPrefix('!')', //Not needed if in html5 mode


function($stateProvider, $urlRouterProvider, $locationProvider) {
    /*
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);
*/
    $urlRouterProvider.otherwise('home');
    //$locationProvider.html5Mode(true); //For disqus directive to work https://github.com/michaelbromley/angularUtils/tree/master/src/directives/disqus

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'public/templates/home.html',
            controller: 'gamesCtrl'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'public/templates/about.html'
            
        })

        .state('game', {
            url: '/games/{gameName}',
            templateUrl: 'public/templates/game.html',
            controller: 'singleGameCtrl'
            
        })

        .state('games', {
            url: '/games',
            templateUrl: 'public/templates/games.html',
            controller: 'gamesCtrl'
            
        })

        .state('blogposts', { 
            url: '/blog',
            templateUrl: 'public/templates/blogposts.html', //<- käytetään kyseistä templatea
            controller: 'blogCtrl'
            
        })

        .state('singlepost', { 
            url: '/blog/{postId}',
            templateUrl: 'public/templates/post.html', //<- käytetään kyseistä templatea
            controller: 'singleBlogCtrl'
        })
}])


.controller('blogCtrl', [
    '$scope',
    'blogApi',
    '$stateParams',
    function ($scope, blogApi, $stateParams){
        $scope.blogPosts = blogApi.query(); //Send a request to get all posts (response defined in services.js)
        /*
        blogApi.query().$promise.then(function (results) {
            // success
            $scope.blogPosts = results;

        });
        */  
        console.log($scope.blogPosts);
        
        //It's now an array of all the blogposts
        //find the newest blogpost Id

        $scope.blogPosts.$promise.then(function (result) {
            arrayBlogs = $scope.blogPosts;
  
            lenBlogs = arrayBlogs.length;
            latestBlog = arrayBlogs[lenBlogs-1];
            console.log(latestBlog);
            blogId = latestBlog._id;
            console.log(latestBlog._id);
            $scope.singlePost = blogApi.get({postId: blogId }); //Request to get data of a single post.
            console.log($scope.singlePost);
        });


        

        
    //Add a single blogpost with ngresource method save
    $scope.addBlogPost = function(){
        if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        if(!$scope.formtext || $scope.formtext === '') { return; }
        if(!$scope.formauthor || $scope.formauthor === '') { return; } 
        

        //create a new instance to save
        var newBlog = new blogApi(); //Put the data from the form into the new instance
        newBlog.title = $scope.formtitle;
        newBlog.body = $scope.formtext;
        newBlog.author = $scope.formauthor;

        newBlog.$save(); //Simply save the new Blogpost to the mass

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };

    }
])

.controller('singleBlogCtrl', [
    '$scope',
    //'commentApi',
    'blogApi',
    '$stateParams',
    '$sce',
    //Get the information of a single blogpost.
    function ($scope, blogApi, $stateParams, $sce){
        $scope.blogPosts = blogApi.query(); //Send a request to get all posts (response defined in services.js)
        console.log("client side request for single blogpost");
        $scope.singlePost = blogApi.get({postId: $stateParams.postId}); //Request to get data of a single post.        
        //var comments = $scope.singleBlogPost.comments;

        var videos = [];
        var i = 0;
        var path = 'http://www.youtube.com/embed/';
        var currentBlog = {};
        
        
        $scope.singlePost.$promise.then(function (result) {
            currentBlog = result;
            return currentBlog;
        })
        .then(function (result) {
            videos = currentBlog.videos;
            return videos;
        })
        .then(function (result) {
            $scope.videoSource = path + result[i];
            $scope.videoSource = $sce.trustAsResourceUrl($scope.videoSource);
        });

    //Add a comment to a single blogpost
    $scope.addComment = function(){
        //if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        if(!$scope.formtext || $scope.formtext === '') { return; }        

        //Read the information of the comment
        var newComment = {body: $scope.formtext, author: $scope.formauthor};

        blogApi.save({postId: currentBlog._id}, newComment);

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    console.log(i);

    $scope.nextVideo = function(){
        i++;
        if (i == videos.length) {
            i = 0;
            $scope.videoSource = path + videos[i];
            $scope.videoSource = $sce.trustAsResourceUrl($scope.videoSource);
        }
        else {
            $scope.videoSource = path + videos[i];
            $scope.videoSource = $sce.trustAsResourceUrl($scope.videoSource);
            
        }
        
    }
    $scope.prevVideo = function(){
        i -= 1;
        if (i == -1) {
            i = videos.length - 1;
            $scope.videoSource = path + videos[i];
            $scope.videoSource = $sce.trustAsResourceUrl($scope.videoSource);
        }
        else {
            $scope.videoSource = path + videos[i];
            $scope.videoSource = $sce.trustAsResourceUrl($scope.videoSource);
        }
    }


 }

    /*
    $scope.changeVideo = function($scope.video){
        console.log(src);
        'ytplayer'.src = "http://www.youtube.com/embed/"+$scope.video;
        console.log(document.getElementById('ytplayer').src);
    }
    */

])

.controller('gamesCtrl', [
    '$scope',
    'gameApi',
    '$stateParams',
    function ($scope, gameApi, $stateParams){
        $scope.gamePosts = gameApi.query(); //Send a request to get all posts (response defined in services.js)
        //It's now an array of all the blogposts
        //find the newest blogpost Id

        $scope.gamePosts.$promise.then(function (result) {
            arrayGames = $scope.gamePosts;
  
            lenGames = arrayGames.length;
            latestGame = arrayGames[lenGames-1];
            gameId = latestGame._id;
            $scope.singleGamePost = gameApi.get({gameName: gameId }); //Request to get data of a single post.
        });


        

        
    //Add a single blogpost with ngresource method save
    $scope.addGamePost = function(){
        //if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        //if(!$scope.formtext || $scope.formtext === '') { return; }
        //if(!$scope.formauthor || $scope.formauthor === '') { return; } 
    
        //create a new instance to save
        var newBlog = new gameApi();
        //Put the data from the form into the new instance
        newBlog.title = $scope.formtitle;
        newBlog.body = $scope.formtext;
        newBlog.features = $scope.formfeatures;
        newBlog.downloadLink = $scope.formdownload;
        newBlog.version = $scope.formversion;
        newBlog.status =  $scope.formstatus;
        newBlog.images = $scope.formimages;

        newBlog.$save(); //Simply save the new Blogpost to the mass

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    }
])

.controller('singleGameCtrl', [
    '$scope',
    //'commentApi',
    'gameApi',
    '$stateParams',
    //Get the information of a single blogpost.
    function ($scope, gameApi, $stateParams){
        
        $scope.gamePosts = gameApi.query(); //Send a request to get all posts (response defined in services.js)
        console.log("client side request for single game");


        $scope.singleGamePost = gameApi.get({gameName: $stateParams.gameName}); //Request to get data of a single post.
        
        $scope.singleGamePost.$promise.then(function (result) {
            currentGame = $scope.singleGamePost;
            $scope.singleGamePost = result;
        });
    }
])
    
