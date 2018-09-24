const webpack = require('webpack');

module.exports = {
    entry: {
        app: '/home/enigmaticmustard/Documents/School/Summer18/HW/hw8/src/App.jsx', 
        vendor: ['react', 'react-dom', 'whatwg-fetch'],
        
    },
    output: {
        path: '/home/enigmaticmustard/Documents/School/Summer18/HW/hw8/static',
        filename: 'app.bundle.js'
    }, 
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ] ,
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader', 
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }

}