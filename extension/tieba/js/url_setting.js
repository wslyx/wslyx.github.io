var local = true;
var url = local ? "chrome-extension://"+chrome.runtime.id+"/js/" : "https://extreme-raptor.asia/extension/tieba/js/"
var ReResMap = [
	{
		"req": "https://www.google-analytics.com/analytics.js",
		"res": "http://www.1.as",
	},
	{
		"req": "https://jumpbookstore.com/client_info/SHUEISHA/html/player/js/viewer_image_1.2.5_2018-10-05.js",
		"res": url+"jumpbookstore_viewer_image_1.2.5.js",
	},
	{
		"req": "http://jumpbookstore.com/client_info/SHUEISHA/html/player/js/viewer_image_1.2.5_2018-10-05.js",
		"res": url+"jumpbookstore_viewer_image_1.2.5.js",
	},
	{
		"req": "https://ribomaga.com/client_info/SHUEISHA_MBS/html/player/js/viewer_image_1.2.5_2018-10-05.js",
		"res": url+"ribomaga_viewer_image_1.2.5.js",
	},
	{
		"req": "http://ribomaga.com/client_info/SHUEISHA_MBS/html/player/js/viewer_image_1.2.5_2018-10-05.js",
		"res": url+"ribomaga_viewer_image_1.2.5.js",
	},
	{
		"req": "https://sokuyomi.jp/hvl/js/setting.js",
		"res": url+"sokuyomi_setting.js",
		"adv_url": url+"sokuyomi_setting.js"
	},
	{
		"req": "https://sokuyomi.jp/hvl/js/seal.min.js",
		"res": url+"sokuyomi_seal.min.js",
		"adv_url": url+"sokuyomi_seal.min(adv).js"
	}
];