# Webpack Starter kit

A webpack starterkit for frontend project including ES6, SASS and more...

**Table of content** 
1. Introduction
2. Concepts of Webpack
3. Set up webpack
4. Config file set up
5. Working with HTML file(s) 
6. Webpack dev server
7. ES6+ and Typescript
	- ES6+
	- Typescript
8. CSS and SCSS
	- CSS (inline)
	- CSS (external file)
	- SCSS
9. Static ressources
10. Environments
11. Webpack dashboard
12. Webpack monitor
13. Webpack bundle analyser
14. Code splitting (work in progress)
15. Lazy loading (work in progress)
16. Tree shaking (work in progress)
17. External ressources and references
18. Final project and github repository


[[TOC]]

## 1 - Introduction

### What is Webpack ?
Webpack is a **module bundler**. It takes modules (js, img, css…) with dependencies and generates static assets representing those modules.

>**"**At its core, **webpack** is a _static module bundler_ for modern JavaScript applications. When webpack processes your application, it internally builds a [dependency graph](https://webpack.js.org/concepts/dependency-graph/) which maps every module your project needs and generates one or more _bundles_.**"**

<br/>

### Is Webpack different from Gulp or Grunt ?
Gulp and Grunt are task runner. They execute predefined tasks. They are on a more “global” level.  
Webpack **is focused on making bundles**. Specialize for build process.

<br/>

### What are the alternatives ?
#### Parcel JS  

 - [https://parceljs.org/](https://parceljs.org/) (fr)
 - [https://github.com/parcel-bundler/parcel](https://github.com/parcel-bundler/parcel) (en)
  
#### RollupJs  
- [https://rollupjs.org/guide/en/](https://rollupjs.org/guide/en/) (en)  
- [https://github.com/rollup/rollup  ](https://github.com/rollup/rollup) (en)
- [https://buzut.net/configurer-rollup-bundles-esm-cjs/](https://buzut.net/configurer-rollup-bundles-esm-cjs/) (fr)
- [https://www.youtube.com/watch?v=ZGa_a164aeM](https://www.youtube.com/watch?v=ZGa_a164aeM) (en)

## 2 - Concepts of Webpack
Webpack have 4 core concepts you should know to set up properly your project.

### Entry
The entry point indicates which module webpack should use to begin building out its internal [dependency graph](https://webpack.js.org/concepts/dependency-graph/)
You have possibility to have multiple entry points too.

**![](https://lh3.googleusercontent.com/A1Kbjzq3M0Q0cJssduA_KbEFMLyZyyA8jZ08e0AYtK8rB6ExAqX7Rz11PZzIyznD-QE0Y8vxYVEICwehJfj0j9lVCivQUeNIOUcwUwSUmst8hJpAXhxmigLK1EWn9ALC2tI4zp0)**
<br/>
### Output
Output config tell webpack where to write final files and how to name these files.

**![](https://lh6.googleusercontent.com/goxSzq2SNwKbM0qWvMj0pAjCP0GjD9RmvwKoG3oAoGgArsIAcSJU1OwSA06l7g2ziu-9QeVm2qGWCCp-CnuZQjfDOVM7L9SPAILIExYzWG6_yTZTt54UhFlr8Jl-Ce_NQfqy8Lk)**

**![](https://lh4.googleusercontent.com/1NvKerhZi39qa1V18PJyvi7Ahyk6UMz-v3svQXP585SswYiMXv9qTA7QtOV5GYolfVvnPHw3oVUSG7Vi364y8MA5bCzqZKM5m3RfzDI09hN06-Xrmo9E-kFNfiUk3VMed-5nYqg)**
>File can be named whatever you want : dist/, dest/ or build/ folder

<br />

### Loaders
According to documentation, Webpack only understands JavaScript and JSON files.
Loaders
Loaders allows us to transform our files that can be interpreted by our application, for example :  
Transpile .ts files to .js ; convert es6 code to es5 code ; .scss to .css and so on.

At a high level,  **loaders**  have two properties in our webpack configuration:

1.  The  `test`  property identifies which file or files should be transformed.
2.  The  `use`  property indicates which loader should be used to do the transforming.

<br/>

### Plugins
While loaders are limited to converting modules from one form to another, plugins will allow us to perform more complex tasks like bundle optimization, asset management...

## 3 - Set up webpack
### Prerequisite

First, you need to install [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/get-npm) if you have not already done so. Check all is good, in your terminal execute :

```javascript
node -v //v12.14.1
```

We are ready ! Create a folder for working on this tutorial. You can call it webpack-tutorial or anything you want : 

```
mkdir webpack-tutorial  
cd webpack-tutorial
```

Then, we need to initialize our project for install dependancies with npm, execute : 
```javascript
npm init -y //-y for pass through the question
```
>npm init will create a package.json file in our folder

We can finally install webpack and webpack-cli :

```javascript
npm install --save-dev webpack@latest webpack-dev-server@latest
```

### Project architecture folder 
Let's go create our project structure like the image below (add template for later) : 
**![](https://lh5.googleusercontent.com/fdbHydfOaMKYMswGzB8NgI_X6QYyss6fH0R46sivrEqecNg4hEuD4sN5uPvg4LfilRj65npismRA2Ba1xn3CAMozWZ4Du1OKRbRpicGfWkIkbssbCE2CFHQn3N2VNaOAyUom1no)**
Create 2 files : 

 - **index.js** or whatever you want (main.js, bundle.js...). This is the entry point of webpack
 - **webpack.config.js** (file used by webpack for build, run...)

<br/>
Now, we need to link our index.html file with our index.js.

```javascript
//index.html
<script src="bundle.js"><script>

//index.js
document.write("Webpack is really hot")
```

Go back to package.json and update this line :
```javascript
    "scripts": {
    	"dev": "webpack --mode development"
    }
```
After that, we can execute npm run dev on our terminal and you should see a dist folder created with `index.js`.
> if you forgot the --mode development, you'll have a warning in console. 

Now you can see webpack works well : 
![](https://hackernoon.com/hn-images/1*pGm-Wos9PHs16w0CUk2e0w.png)

From now Webpack work well for basic usage with no configuration file. But if you want more features like converts scss to css. We nee to add some config.

##  4 - Config file set up
Once we have do that, we can starting to work on our configuration webpack. Open **webpack.config.js**.

Start by import webpack and path module : 
```javascript
const webpack = require('webpack');
const path = require("path");
```

<br/>
Like we saw, we define an entry point and an output dist :

```javascript
module.exports = {
	entry: ".src/index.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "./bundle.js
	}	
}
```
If we execute `npm run dev` again, we have the same behavior for now. You can see webpack only copy our `index.js` file, not the html. Let's see how we can improve that with first plugin !

## 5 - Working with HTML
For copying our index.html file into the dist folder, we need to install a plugin : **[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)**

Execute `npm i html-webpack-plugin -D` 
Then, update our config file like so : 

```javascript
module.exports = {
	...
	plugins: [
		new HtmlWebpackPlugin({
			title: 'webpack starter kit',
			template: './src/index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: false
			}
		})
	]
}
```
We indicate the entrypoint with `template: 'path_to_the_html_file'`
We can add a variable (title in our exemple) and inject into html.
On index.html, add this line in the head section : 

     <title> <%= htmlWebpackPlugin.options.title %> </title>
>Later, we'll see how to use same way to inject js variables.

Now execute `npm run dev` again. HTML file is well copy in our dist folder. It contains bundle.js beateen script tags and title is replaced by title config variable.

### Working with multiple html file.
With html-webpack-plugin, you can manage multiple html file. The easy way is to create a newinstance of HtmlWebpackPlugin.

```javascript
module.exports = {
	...
	plugins: [
		new HtmlWebpackPlugin({
			name: 'index',
			template: './src/index.html',
		}),
		new HtmlWebpackPlugin({
			name: 'page_2',
			template: './src/page_2.html',
		}),
		new HtmlWebpackPlugin({
			name: 'page_3',
			template: './src/page_3.html',
		}),
	]
}
```

Easy but not really aesthetic no ? Let's try a better solution.
First install fs with `npm i fs`
Then import into webpack.config.js, add `const  fs  =  require('fs');`

Under 

```javascript
module.exports = {
	....
}
```

Copy/paste this code : 

```javascript
    //Function that generates multiple html plugins
    function  generateMultipleHtmlPlugins(template_dir) {
    	// Read files in template directory and return array
    	const template_files  =  fs.readdirSync(path.resolve(__dirname, 			template_dir))
    
	    return template_files.map(item  => {
	    	// Split names and extension
	    	const parts = item.split('.')
	    	const name = parts[0]
	    	const extension = parts[1]
	    
	    	// Create new HTMLWebpackPlugin with options
	    	return new HtmlWebpackPlugin({
	    		filename: `${name}.html`,
	    		template: path.resolve(__dirname, 		`${template_dir}/${name}.${extension}`)
    		})
    	})
    }
    
    // Call our function
    const html_plugins = generateMultipleHtmlPlugins('../template')

and finally add this at the end of the plugins array : 

    	...
    	plugins: [
    		new HtmlWebpackPlugin({
    			name: 'index',
    			template: './src/index.html',
    		}),
    	].concat(html_plugins),
```


We read in our template dir all html files. We get the name without extention and return a new  instance of HTMLWebpackPlugin with correct options. 
Finally we add to the plugin with the concat() array method all of our HTMLWebpackPlugin.

## 6 - Webpack dev server
A cool feature is possibility to make any change and have an instant visual change without refresh the browser. Webpack dev server allow to use a simple web server and to use live reloading. 
<br>
As usual, install it with npm : `npm i webpack-dev-server -D`
After go to package.json file and update scripts part : 

```javascript
"scripts": {
	"start": "webpack-dev-server --mode development",
	"dev": "webpack --mode development"
}
```

We have now two commands from npm. Run the second one Now we execute `npm start` and we have a server  
Go to [http://localhost:8080](http://localhost:8080) and try to add some content in your HTML file for testing.

## 7. ES6+ and Typescript
Remember, webpack only understand javascript. So for using typescript and ES6+ we need a... Loader !

### ES6+ to ES5
First install babel loader who allow to convert es6/typescript to browser executable javascript `npm i babel-loader @babel/core @babel/preset-env -D`

Update webpack.config.js :

```javascript
Module : {
 	rules: [
 		{
 			test: [/.js$/],
 			exclude: /(node_modules)/,
 			use: {
 				loader: 'babel-loader',
 				options: {
 					presets: [
  					@babel/preset-env
 					]
 				}
 			}
 		}
 	]
}
```

For testing, create a header.js file into src/js with the following code : 

```javascript
export class Header {
	constructor() {
		console.log(`Header is instancied`);
	}
	
	getHeaderText() {
		return `Header class from js file`;
	}
};
```

and into our index.js, update like so : 

```javascript
import { Header } from  './header';

let header = new Header();
let header_text = header.getHeaderText();
console.log(header_text);
```

Now into your browser, you can see messages in console !

### TYPESCRIPT to ES5
Like ES6, we install loader for processing typescript file `npm i @babel/preset-typescript typescript -D`

After installing typescript, you'll see a tsconfigfile.json for transpilation option. Important part here is the target options. Copy/paste this code for now : 

```javascript
    {
    "compilerOptions": {
	    "target": "esnext",
	    "moduleResolution": "node",
	    "allowJs": true,
	    "noEmit": true,
	    "strict": true,
	    "isolatedModules": true,
	    "esModuleInterop": true,
	    "baseUrl": ".",
    },
    "include": [ "src/**/*" ],
    "exclude": [ "node_modules", "**/*.spec.ts" ]
    }
```

<br>
Once again, update our webpack.config.js : 

```javascript
module: {
	 rules: [
		{
			test: [/.js$|.ts$/],
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/typescript'
						]
					}
			  }
		  }
	 ]
}
```

This time we tell to webpack to checking for js/ts extensions. Create footer.ts file into src>ts folder for checking :

```javascript
export class Footer {
	footertext: string;
	
	constructor() {
		console.log(`Footer is instancied`);
	    this.footertext = `Footer class from ts file`;
    }
	    
	getFooterText(): string {
		return this.footertext
    }
}
```

Update index.js file too : 

```javascript
import { Header } from  './header';
import { Footer } from  './../ts/footer';

let header = new Header();
let firstHeading = header.getHeaderText();
console.log(firstHeading);
  
let footer = new Footer();
let footerText = footer.getFooterText();
console.log(footerText);
```

Run `npm start` and go to `http://localhost:8080` you'll see footer's messages in console.

## 8. CSS and SCSS

### css 
We first install 2 loaders with `npm i css-loader style-loader -D`

 - css-loader allow webpack to convert css file into string
 - style-loader take css converted file(s) and insert them inside `<style>` 

In the same way as for the js/ts, in webpack.config.js file we create a new rule into module part after older one:

```javascript
module: {
	rules: [
		{
			test: [/.js$|.ts$/],
			....
    	},
    	//add new part just here
		{                  
			test: [/.css$/],                  
			use:[                      
				'style-loader',                    
				'css-loader'  
			]              
		}
    ]
} 
```

Then, create a css file into src>css folder. You can call it `style.css`. Add the following code : 

```css
h1 {
	font-size: 30px;
	color: green;
}
```

update `index.html` and `index.js`

```javascript
//index.html
<h1> welcome to webpack starter tutorial</h1>

//index.js
import  './../css/style.css';
``` 

Execute `npm start` and we can see style is properly applied. 
But if you want css inside a external file and not inline inside style tags, you need to add a new plugin `mini-css-extract-plugin`
<br>
### external css file (instead of inline style)
Install plugin : `npm i mini-css-extract-plugin -D`

Then go to webpack.config.js and import plugin at top of file :

    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

add update code on the plugin part to add new plugin : 

```javascript
plugins: [
	new  HtmlWebpackPlugin({
		title: 'Webpack 4 Starter',
		...
	}),
	new  MiniCssExtractPlugin({
		filename: 'style.css'
	}),
]
```
In Rules part, update code : 

```javascript
{
	test: [/.css$/],
	use:[
		MiniCssExtractPlugin.loader,
		'css-loader',
	]
},
```

If you come back to browser, webpack now insert  `<link href='style.css' rel='stylesheet'>` in the head part.
<br/>
 
### scss
Just like css, install first loader : `npm i node-sass sass-loader -D`

We can update rules part with scss options inside webpack.config.js file : 

```javascript
{
    test: [/.css$|.scss$/],
    use:[
	    MiniCssExtractPlugin.loader,
	    'css-loader',
	    'sass-loader',
	]
},
```

Then, create a scss file into src>scss folder. You can call it `main.scss`. Add the following code : 

```css
p {
	font-size: 20px;
	color: red;
}
```

update `index.html` and `index.js`

```javascript
//index.html
<h1> welcome to webpack starter tutorial</h1>
<p> with me </p>

//index.js
import  './../scss/main.scss';
```

Go to browser and check all is fine.

## 9. Loading static ressources (img, icons...)

First we need to install 1 loader called file-loader and a plug-in called copy-webpack-plugin : 

 - file-loader : `npm i file-loader -D`  
 - copy-webpack-plugin : `npm i
   copy-webpack-plugin -D`

If we only use file-loader, we need to import each assets in index.js. It's more easier to import directly onto html file with `<img src=''>` what's going to help us make copy-webpack-plugin.

First add new config to rules in `webpack.config.js` : 

```javascript
{
    test: /\.(png|jpg|gif|svg)$/,
    use: [
	    {
		    loader: 'file-loader',
		    options: {
			    name: '[name].[ext]',
			    outputPath: './dist/images'
		    }
	    }
    ]
},
```

Then import copy-webpack-plugin :

    const Copy_webpack_plugin = require('copy-webpack-plugin');

After that add new plugin in the plugin part : 

```javascript
new  CopyWebpackPlugin([
	{ from: 'src/images', to: 'images' }
]),
```

Create a folder in src called images. Put a random image inside. 
Finally we can update index.html by adding a image : 

    <img  id="logo" alt="logo" src="./images/logo.jpg">

Run npm start and we should see our image.

## 10. Environnements 

It could be usefull to have differents environments. For exemple one for develop and another one for production with special feature like minify or uglify code for optimize output code.
So we split our `webpack.config.js` into 3 separates config files like so : 

 1. webpack.common.config.js
 2. webpack.dev.config.js
 3. webpack.prod.config.js

Create a new folder called `configs` at the root of project. Create these 3 config files.
You can copy paste content from `webpack.config.js` to `webpack.common.config.js`. 
Update output part by `path: path.resolve(__dirname, "../dist")` instead of `path: path.resolve(__dirname, "dist")`

After that, install tool who allow to merge common config onto dev/prod config : 

    npm i webpack-merge -D

Once installation is finished, go inside `webpack.dev.config.js` and copy/paste this code: 

```javascript
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common.config')

module.exports  =  merge(webpackBaseConfig, {})
```

We tell to webpack where is the initial config and to merge it onto our dev config.

Then in `webpack.config.js`  copy/paste this code : 

```javascript
const environment = (process.env.NODE_ENV  ||  'development').trim();
    
if (environment === 'development') {
	module.exports = require('./config/webpack.dev.config.js');
} else {
	module.exports = require('./config/webpack.prod.config.js');
}
```

We tell to webpack to get the environment from terminal (NODE_ENV) and apply the correct config. By default, development is applied.

<br>

### Set the environment variables

To set the environment variable for `dev` and `prod` we need a npm package called `cross-env`. It allow to every platform to acces to the environment variables. Install it : 

    npm i cross-env -D

We can go back to our package.json to update the scripts part/

```javascript
"scripts": {
	"build:dev": "cross-env NODE_ENV=development webpack --mode development",
	"build:prod": "cross-env NODE_ENV=production webpack --mode production",
	"start": "webpack-dashboard webpack-dev-server --mode development --hot"
},
```

<br>

### Optimizations

To avoid having to delete the folder manually, we can install a plugin called clean-webpack-plugin. Install it now : 

    npm i clean-webpack-plugin -D

Then add the plugin to the `webpack.common.config.js` : 

```javascript
const CleanWebpackPlugin   = require('clean-webpack-plugin');
...    

plugins: [
	new  HtmlWebpackPlugin({
	}),
	...
	new  CleanWebpackPlugin()
]
```

<br>

### Optimizations for production
It's important to better optimize (minify/uglify) our code before pushing it in production. So we need to install some plugin to help us.

 - uglifyjs-webpack-plugin (minifying Javascript code)
 - optimize-css-assets-webpack-plugin

Install those plugins : 

    npm i uglifyjs-webpack-plugin -D
    npm i optimize-css-assets-webpack-plugin -D

Then update webpack.prod.config.js file : 

```javascript
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config.js');
      
module.exports = merge(webpackBaseConfig, {
    optimization: {
	    minimizer: [
		    new  UglifyJsPlugin(),
		    new  OptimizeCSSAssetsPlugin()
	    ]
    }
 });
```

<br>

### Adding hash

Come back to `webpack.common.config.js` this is very easy to add hash to our file. 

```javascript
output: {
	path: path.resolve(__dirname, "../dist"),
	filename: '[name].[chunkhash:5].js'
},
```

We can add `[chunhash]` or `[chunkhash:5]` (limited to 5 characters). Our ouput file are exported like that `main.a5b6c.js` now.

<br>

We can apply same principle with css file and assets files but we use `[contenthash]` in this case :  
```javascript
plugins: [ 
	...
	new MiniCssExtractPlugin({
		    filename: 'style.[contenthash:5].css'
	    }),
]
```

```javascript
module: {
    rules: [
		...
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name][contenthash:5].[ext]',
                  outputPath: './dist/images'
                }
              }
            ]
        }
]
```

Each time we build, hash are added to the end of our files.

## 11. Webpack dashboard
For people having problems with the output shell presentation of webpack. We can pimp our terminal like that : 

![](https://www.alsacreations.com/xmedia/doc/original/terminal-webpack.png)

Install with npm : `undefined
npm install webpack-dashboard --save-dev
` and add it to plugins section inside `webpack.prod.config.js` because we want only this service for analyse production build:

```javascript
const DashboardPlugin = require("webpack-dashboard/plugin");

plugins: [
	...
	new DashboardPlugin()
]
```

Finally update script in packaqge.json for launching dashboard at start.

```javascript
"scripts": {
	...
	"start": "webpack-dashboard webpack-dev-server --mode development --hot"
},
```

## 12. Webpack monitor
Like webpack dashboard, you have possibility to add some great services for analyse your bundles. We start with `webpack monitor`
![](http://webpackmonitor.com/img/overview.gif)

Do installation with : `npm install --save-dev webpack-monitor`
Then go to webpack.prod.config.js and update config : 

```javascript
const WebpackMonitor = require('webpack-monitor');

// ...

plugins: [
	new DashboardPlugin(),
	new WebpackMonitor({
	    capture: true, //default: 'true'
	    target: '../monitor/myStatsStore.json', //default: '../monitor/stats.json'
	    launch: true, //default: 'false'
	    port: 3030, //default: 8081
	    excludeSourceMaps: true //default: 'true'
	}),
],
```

## 14. Code splitting (work in progress)
## 15. Lazy loading (work in progress)
## 16. Tree shaking (work in progress)

## 17. External ressources and references
#### Documentation
Official documentation : [https://webpack.js.org/](https://webpack.js.org/)
Github repository : [https://github.com/webpack/webpack](https://github.com/webpack/webpack)
Github exemple : [https://github.com/webpack/webpack/tree/master/examples](https://github.com/webpack/webpack/tree/master/examples)

<br>

#### Articles & Tutorials
[https://hackernoon.com/lets-start-with-webpack-4-91a0f1dba02e](https://hackernoon.com/lets-start-with-webpack-4-91a0f1dba02e)
[https://www.freecodecamp.org/news/creating-a-production-ready-webpack-4-config-from-scratch/](https://www.freecodecamp.org/news/creating-a-production-ready-webpack-4-config-from-scratch/)
[https://github.com/ruanyf/webpack-demos](https://github.com/ruanyf/webpack-demos)
<br>
#### Vidéos 
[https://www.grafikart.fr/tutoriels/webpack](https://www.grafikart.fr/tutoriels/webpack)
[https://www.youtube.com/watch?v=MpGLUVbqoYQ](https://www.youtube.com/watch?v=MpGLUVbqoYQ)
## 18. Final project and github repository
You can download the entire project and use it anyway you want. Go to [github](https://github.com/LiegardP/webpack-starter) and clone the repo. After adding your file, just do `npm start` or `npm run build:env`

