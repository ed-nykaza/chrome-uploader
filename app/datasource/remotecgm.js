define(["./mongolab"], function(mongolab) {
	var ml;
	var mongolabUrl = "https://api.mongolab.com/api/1/databases/";
	return {
		connect: function() {
			return new Promise(function(good, bad) {
				chrome.storage.local.get("config", function(local) {
					ml = local.config.mongolab;
					mongolab.testConnection(ml.apikey, ml.database, ml.collection).then(good, bad);
				})
			});
		},
		disconnect: function() {
			// no op
		}, 
		readFromReceiver: function(pageoffset) {
			return new Promise(function(good, bad) {
				$.getJSON(
					mongolabUrl + ml.database + "/collections/" + ml.collection + "?apiKey=" + ml.apikey + "&l=288&s={\"date\":-1}"
				).then(function(docs) {
					good(docs);
				}, bad)
			});
		}
	}
});