
// new http header parameters to override
var newHeader = {
	twitterReferer: {
		name: "Referer",
		value: "https://www.twitter.com", // or "https://www.facebook.com"
	},
	googleReferer: {
		name: "Referer",
		value: "https://www.google.com", // or "https://www.facebook.com"
	},
	cookie: {
		name: "Cookie",
		value: ""
	},
	cachecontrol: {
		name: "Cache-Control",
		value: "max-age=0"
	}
};

// sites that we want to access
var sites = {
	wsj: {
		url: "*://*.wsj.com/*",
		js: "*://*/*cxense-candy.js" // this one causing a pop up advertisement for every article
	},
	ft: {
		url: "*://*.ft.com/*",
	},
	nyt: {
		js: "*://*.com/*mtr.js", // this one causing a pop up asking for subscription
		block: "*://meter-svc.nytimes.com/*", // this one causing a pop up asking for subscription
	},
	wapo: {
		url: "*://*.washingtonpost.com/*",
		block: "*://pwapi.washingtonpost.com/*", // this one causing a pop up asking for subscription
	},
	bostonglobe: {
		block: "*://meter.bostonglobe.com/*", // this one causing a pop up asking for subscription
	}
};

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		console.log( "we are going to block some low energy javascripts" );
		
		return { cancel: true };
	}, {
		urls: [ sites.nyt.js, sites.wsj.js, sites.wapo.block, sites.nyt.block, sites.bostonglobe.block],
		// target is script
		types: [ "script", "sub_frame"]
	},
	[ "blocking" ]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function( details ) {

		// remove existing referer and cookie
		for ( var i = 0; i < details.requestHeaders.length; i++) {
			if ( details.requestHeaders[i].name === newHeader.twitterReferer.name || details.requestHeaders[i].name === newHeader.cookie.name ) {
				details.requestHeaders.splice(i, 1);
				i--;
			}
		}

		// add new referer
		console.log(details.url);
		if (details.url.includes("washingtonpost")){
			console.log( "we are going to override with google referer" );
			details.requestHeaders.push( newHeader.googleReferer );	
		} else {
			console.log( "we are going to override with twitter referer" );
			details.requestHeaders.push( newHeader.twitterReferer );	
		}
		
		// remove cache
		details.requestHeaders.push( newHeader.cachecontrol );

		return { requestHeaders: details.requestHeaders };
	}, {
		urls: [ sites.wsj.url, sites.ft.url, sites.wapo.url ],
		// target is the document that is loaded for a top-level frame
		types: [ "main_frame" ]
	},
	[ "blocking", "requestHeaders" ]
);

