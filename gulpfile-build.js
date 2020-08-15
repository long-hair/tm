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
})

// 处理css
task('scss', async ()=>{
  src('./scss/*.scss')
  .pipe(load.sass())
  .pipe(load.rev())
  .pipe(load.minifyCss())
  .pipe(dest('./dist/css'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/scss'))
})

// 处理iconfont
task('icon', async ()=>{
  src('./iconfont/*.*')
  .pipe(load.sass())
  // .pipe(load.rev())
  // .pipe(load.minifyCss())
  .pipe(dest('./dist/iconfont'))
  // .pipe(load.rev.manifest())
  // .pipe(dest('./rev/scss'))
})
// 处理swiper
task('swiper', async ()=>{
  src('./swiper/*.*')
  // .pipe(load.sass())
  // .pipe(load.rev())
  // .pipe(load.minifyCss())
  .pipe(dest('./dist/swiper'))
  // .pipe(load.rev.manifest())
  // .pipe(dest('./rev/scss'))
})
// 处理js
task('script', async ()=>{
  src('./script/*.js')
  .pipe(load.rev())
  .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(load.uglify())
  .pipe(dest('./dist/script'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/js'))
})

// 处理html
task('html', async ()=>{
  src(['./rev/**/*.json','./pages/*.html'])
  .pipe(load.revCollector({replaceReved:true}))
  .pipe(load.minifyHtml())
  .pipe(dest('./dist/pages'))
})
//处理json数据
task('json', async ()=>{
  src('./json/*.*')
  .pipe(dest('./dist/json'))
})
// 监听文件变化
// task('watch',async ()=>{
//   watch('./image/*.*',series('image'));
//   watch('./style/*.css',series('style'));
//   watch('./script/*.js',series('script'));
//   watch('./pages/*.html',series('html'));
// })

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3001
  });
})

// 构建生产包
task('build',series('delDist','json','swiper','icon','image','scss','script','html','connect'))
