var str = "";

var url = "https://twitch.tv/" + str;

var headers =  {
    'Client-ID': ''
};

var old_state = false;

chrome.browserAction.onClicked.addListener(function(tabs) {
	
	chrome.tabs.create({ url: url });

});


setInterval(function() {
	const request = new Request('https://api.twitch.tv/kraken/streams/' + str, {
        headers
    });

        fetch(request)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(
                        	json => updateState(json)
                        )
                }
            })
            .catch(error => {
                console.error(new Date(), "Fetch error: ", error)
            });
}, 10000);

function updateState(json)
{
	if (json['stream'] != null) {
		if (old_state == false) {
			var options = {
	            body: json['stream']['channel']['status'],
	            icon: '/img/icon.png'
	        }
	        var n = new Notification(str + " is on live", options);

	        chrome.browserAction.setBadgeText({
            		text: 'ON'
        	});
        	chrome.browserAction.setBadgeBackgroundColor({
            		color: 'green'
        	})
	}
		old_state = true;
	} else {
		old_state = false;
		chrome.browserAction.setBadgeText({
            		text: 'OFF'
        	});
        	chrome.browserAction.setBadgeBackgroundColor({
            		color: 'gray'
        	})
	}
}
