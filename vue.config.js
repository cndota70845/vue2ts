const { resolve } = require('path');

const config={
    publicPath: './',
    pages:{
        index:{
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title:'vue2ts'
        }
    },
    configureWebpack: (config)=>{
        if(process.env.NODE_ENV === 'production'){
          config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    outputDir:'dist',
    alias: {
        // 键必须以斜线开始和结束
        '/@/': resolve(__dirname, './src/')
    }
    
}
module.exports = config;
