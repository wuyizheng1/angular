//第一部分
var gulp = require('gulp');
// webserver服务器模块
//mock数据操作,需要引入url及fs，但是url/fs是内置的，所以不需要安装

var webserver = require('gulp-webserver');
gulp.task('copy-index',function(){
      return gulp.src('./src/index.html')
      .pipe(gulp.dest('./www'));
});
gulp.task("templateTask",function(){
	return	gulp.src('./src/template/**')
	.pipe(gulp.dest('./www/template'));
});
gulp.task("fontsTask",function(){
  return  gulp.src('./src/fonts/**')
  .pipe(gulp.dest('./www/fonts'));
});

//注意:1 gulp全局环境 2gulp的文件夹内的环境3.服务器访问的根目录
//4.直接localhst未发现  域名--服务器(本地主机)---server环境中设置根目录
//创建本地服务器任务
// 第二部分
 
gulp.task('webserver', function() {
  gulp.src('./www').pipe(webserver({  //设置了服务器的根目录  
      livereload: false,//只有这句话才能实现html页面自动自动页面帅新 没有还是会监控的但不会自动刷新
      open:true,
     // directoryListing:true , //目录清单
       // port:8080
      
 
  }))
})

// 第三部分sass和css 多变一一复制,一监控帅新  都是在我写的文件上操作index的复制 监控
// sass的复制 监控 修改
  var sass = require('gulp-sass');
  gulp.task('sassTask',function(){//这个
  return gulp.src('./src/css/**')  //从XX
  .pipe(sass()) //复制(插)
  .pipe(gulp.dest('./www/css'));//服务器下会产生合并的css //到
})

  



//第四部分 js部分
//js的模块化打包操作
var webpack = require('gulp-webpack');
gulp.task('jsTask',function(){
  return gulp.src('./src/js/**')  //从XX
  .pipe(named()) // //这个安装插件,放在前面,还是src下的文件名//重命名(插)
  .pipe(webpack())  //复制(插)
  // .pipe(uglify()) // js(丑化)压缩(插)
  .pipe(gulp.dest('./www/js')); //到
})
//命名模块 压缩(丑化) 
var named = require('vinyl-named');//.pipe(named()) //


//监控
var watch = require('gulp-watch');
//队列模块
var sequence = require('gulp-watch-sequence');




//图片复制
gulp.task("copy-image",function(){
  // return gulp.src("images/*.{png,jpg}").pipe(gulp.dest('dist/images'))
  // return gulp.src("['images/*.png','images/*.jpg']").pipe(gulp.dest('dist/images'))
  return gulp.src('./src/img/**').pipe(gulp.dest('./www/img'))
})

//第五部分 一起监听帅新//监听操作
// gulp.task('watch',function(){
//   gulp.watch('./src/index.html',['copy-index']);

// })
// gulp.task('watch',function(){
//   gulp.watch('./src/css/**',['sass','verCss','html']);//./src/css/index.css

// })  
gulp.task('watch',function(){//监听是a和b同步,不是一个操作或修改
  gulp.watch('./src/index.html',['copy-index']); 
  gulp.watch('./src/img/**',['copy-image']); 
  gulp.watch('./src/js/**',['jsTask']);
  gulp.watch('./src/css/**',['sassTask']);
  gulp.watch('./src/fonts/**',['fontsTask']);
  gulp.watch('./src/template/**',['templateTask']);



  // var queue = sequence(300);
  // watch('./src/js/**',{
  //   // name:"JS",
  //   // emitOnGlob:false
  // }, queue.getHandler('jsTask'));
  // //合并压缩  生成新版本js和对应json 让html通过json去找新生成的版本的js而不是老的js

  // watch('./src/css/**',{
  //   // name:"CSS",
  //   // emitOnGlob:false
  // }, queue.getHandler('sassTask'));//合并压缩  生成新版本js和对应json 让html通过json去找新生成的版本的js而不是老的js

  // watch('./src/fonts/**',{
  //   // name:"CSS",
  //   // emitOnGlob:false
  // }, queue.getHandler('fontsTask'));//合并压缩  生成新版本js和对应json 让html通过json去找新生成的版本的js而不是老的js
  // watch('./src/template/**',{
  //   // name:"CSS",
  //   // emitOnGlob:false
  // }, queue.getHandler('templateTask'));//合并压缩  生成新版本js和对应json 让html通过json去找新生成的版本的js而不是老的js

})

gulp.task('default',['webserver','watch']);
//第一个网页www根目录index.html自动帅新Or打开  第二个监听src下文件一个或多个任务ss
