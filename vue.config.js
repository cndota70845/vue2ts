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
        config.resolve.alias = {'/@/': resolve(__dirname, './src/')}
    },
    outputDir:'dist'
}
module.exports = config;
