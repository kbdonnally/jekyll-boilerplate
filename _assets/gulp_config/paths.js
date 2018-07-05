// set all path variables

var _,

	// top-level directories
	assetDir 		= '_assets/',
	compiledAssetDir  = 'assets/',
	siteAssetDir 	= '_site/assets/',
	siteDir 		= '_site/',

	// asset folders
	imgDir 			= 'img',
	jsDir 			= 'js',
	sassDir 		= 'css',

	// filetype searches
	imgGlob 		= '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)',
    jsGlob 			= '/**/*.js',
    sassLibGlob		= '/lib/**/*.+(scss|css)'

	// filename (1 b/c using @import)
	sassFileName 	= '/style.scss';

_ = {
	// uncompiled folders
	myStylesFolder: 	  assetDir + sassDir,
	myImgFolder: 	      assetDir + imgDir,
	myJSFolder: 		  assetDir + jsDir,

	// compiled folders
	compiledStylesFolder: compiledAssetDir + sassDir,
	compiledImgFolder: 	  compiledAssetDir + imgDir,
	compiledJSFolder: 	  compiledAssetDir + jsDir,

	// site target folders
	siteStylesFolder: 	  siteAssetDir + sassDir,
	siteImgFolder: 	  	  siteAssetDir + imgDir,
	siteJSFolder: 	  	  siteAssetDir + jsDir,
};

// gulp src values
_.sassSrc 	= _.myStylesFolder + sassFileName;
_.cssLibSrc = _.myStylesFolder + sassLibGlob;
_.imgSrc  	= _.myImgFolder + imgGlob;
_.jsSrc   	= _.myJSFolder + jsGlob;

// rename for readability
var paths 	= Object.assign(_);

// node export
module.exports = paths;