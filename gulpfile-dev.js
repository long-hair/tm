// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist');
})

// 处理图片
task('image', async ()=>{
  src('./image/**/*.*')
  .pipe(dest('./dist/image'))
  .pipe(load.connect.reload())
})
// 处理iconfont
task('icon', async ()=>{
  src('./iconfont/**/*.*')
  .pipe(dest('./dist/iconfont'))
  .pipe(load.connect.reload())
})
// 处理scss
task('scss', async ()=>{
  src('./scss/*.*')
  .pipe(load.sass())
  .pipe(dest('./dist/css'))
  .pipe(load.connect.reload())
})

// 处理js
task('script', async ()=>{
  src('./script/*.js')
  // .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(dest('./dist/script'))
  .pipe(load.connect.reload())
})

// 处理html
task('html', async ()=>{
  src('./pages/*.html')
  .pipe(dest('./dist/pages'))
  .pipe(load.connect.reload())
})

// 处理swiper
task('swiper', async ()=>{
  src('./swiper/**/*.*')
  .pipe(dest('./dist/swiper'))
  .pipe(load.connect.reload())
})
// 处理json数据
task('json', async ()=>{
  src('./json/*.*')
  .pipe(dest('./dist/json'))
  .pipe(load.connect.reload())
})
// 监听文件变化
task('watch',async ()=>{
  watch('./image/**/*.*',series('image'));
  watch('./scss/*.*',series('scss'));
  watch('./script/*.js',series('script'));
  watch('./pages/*.html',series('html'));
  watch('./iconfont/*.*',series('icon'));
  watch('./swiper/*.*',series('swiper'));
  watch('./json/*.*',series('json'));



})

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3000
  });
})

// 构建开发包
task('dev',series('delDist','json','icon','swiper','image','scss','script','html','connect','watch'))
