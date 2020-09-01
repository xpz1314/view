var { src, dest, series, parallel, watch, prependListener} = require ('gulp');
var clean =require ( 'gulp-clean' );
var fileInclude = require ( 'gulp-file-include' );
var webserver = require ('gulp-webserver');

function cleanTask(){             //清除
    return src ('./dist' , {allowEmpty:true })
        .pipe( clean() );
}

function fileIncludeTask(){     //代码片段
    return src('./src/view/*.html')
        .pipe(fileInclude({
            prefix: '@',
            basepath:'./src/view/templates'
        }))
        .pipe(dest('./dist/view'))
}
function webserverTask(){        //服务器
    return src('./dist')
        .pipe(webserver( {
            host:'localhost',
            port:4000,
            open:'./view/index.html',
            livereload:true
        }));

}

function watchTask(){         //监听
    watch( './src/view/*.html',fileIncludeTask)
}

module .exports ={
    //开发
    dev:series( cleanTask,fileIncludeTask ,parallel( webserverTask,watchTask)),
    //生产
    build:series( cleanTask ),

}