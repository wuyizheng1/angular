var healthApp =angular.module('health',['ui.router'])
    
	.config(function($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider){

		$urlRouterProvider.otherwise('/navbar/home123');
		// navbar找navbar模板    home找navbar下面所有的子类 url相同的模板
		// 一 ：2个模板 父子关系  url一定要严格匹配

		$urlMatcherFactoryProvider.caseInsensitive(true);

		$stateProvider
		

		.state('公共页',{  //父亲
			url:'/navbar',
			templateUrl:'./template/navbar.html',
			controller:'navbarController'
		})
		.state('公共页.下默认首页',{  //只要有这种父子关系就行 儿子
			url:'/home123',
			templateUrl:'./template/home.html',
			controller:'homeController'
		})
  		.state('公共页.下列表',{
          url:"/helList/:id/:page",
          templateUrl:"./template/helList.html",
          controller:"helListController"
        })


        .state('公共页.下详情',{
           url:"/helDetail/:id",
           templateUrl:"./template/helDetail.html",
           controller:"helDetailController"
        })
	})
	.controller('navbarController',function($scope,$http){
		$http({
			url:'http://wyzpw.pw/php/helFenlei.php'
		}).then(function(res){
			// console.log(res.data.tngou);
			// console.log(res)
			$scope.categories = res.data.result;
		})
	})  //公共页一开始就请求了  
	.controller('homeController',function($scope){
		$scope.welcome = "欢迎来到健康大杂汇";
	})   //子页
	
	// 先路由后控制器一起执行
	.controller('helListController',function($scope,$stateParams,$http){
		$http({
			url:'http://wyzpw.pw/php/helList.php',
			params:{
				id:$stateParams.id, //类
				page:$stateParams.page,//第几页
                rows:9  //每页多少个  修改传过来的参数啦  php返回每页9个,第几页的
			}
		}).then(function(res){ 
			//上面3参数
			
			console.log(11111)
			console.log(res)
			console.log($stateParams)
			$scope.myLists = res.data.result;
			 // console.log(res.data.list);
			var pageCountList = [];
			var rows = 9;

			for(var i=1;i<=Math.ceil(res.data.total/rows); i++){
				pageCountList.push(i);
			}//该类 多少页
			$scope.id = $stateParams.id;
			$scope.pages = pageCountList;
		})
	})
	.controller('helDetailController',function($scope,$stateParams,$http){
		$http({
			url:'http://wyzpw.pw/php/helDetail.php',
			params:{
				id:$stateParams.id
			}
		}).then(function(res){
			console.log("详情")
			console.log(res)
			console.log(res.data.keywords);
			$scope.details = res.data.result;
			
		})
	})
	.directive("compile", function($compile) {
        return function(scope,element,attrs){
          scope.$watch(
            function(scope){
              return scope.$eval(attrs.compile);
            },
            function(value){
              element.html(value);
              $compile(element.contents())(scope);
            }
          )
        }
      })
