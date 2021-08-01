// webpack.config.js

module.exports = {
    module: {
        rules: [
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            indentedSyntax: true // optional
                        },
                        // Requires >= sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, 
                {
                    loader: "css-loader" // translates CSS into CommonJS
                }, 
                {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            },
            {
				test: /\.s(c|a)ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						// Requires sass-loader@^7.0.0
						options: {
							implementation: require('sass'),
							indentedSyntax: true // optional
						},
						// Requires sass-loader@^8.0.0
						options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
							},
						},
					},
				],
			},
        ],
    }
}