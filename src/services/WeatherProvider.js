export class WeatherProvider {


    static  appId = "7c2e55d0db7e42346efa862064b8123e";
    static  myDrawingPageAcessToken = "EAAHktiDrxJsBAD0zdnVZBnIDqF68rmpvmkhogP36BMKFPE0e2b9w23wZAZBwJgc9EQyq3tjSOs8yZCnZBIKnAf0zBBCmCSPmfSA36CVidMJl0WmgGvGf4jnsvhfGAY0FQJUInLnD1zrrZCaJqYKoQI0TO6NfZAAifbBlXYxG4lgQrrGrECrrgPIC1ZBbqZCTZCslGcnJXvPsdDWgZDZD";

    static publishPostOnFaceBook(message) {
        return new Promise(async (resolve, reject) => {

            try {
                this.makeRequest("POST", `https://graph.facebook.com/1573390676258394/feed?message=${message}&access_token=${this.myDrawingPageAcessToken}`).then((res) => {
                    resolve(JSON.parse(res.responseText));
                })
            } catch (e) {
                reject(e);
            }

        });
    }

    static getCurrentData(city) {
        return new Promise(async (resolve, reject) => {

            try {
                this.makeRequest("GET", `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.appId}&units=metric&mode=xml`).then((res) => {
                    resolve(res.responseXML);
                    console.log(res.responseXML);
                })
            } catch (e) {
                reject(e);
            }

        });
    }

    static getPredication(city) {
        return new Promise(async (resolve, reject) => {

            try {
                this.makeRequest("GET", `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${this.appId}&units=metric`).then((res) => {
                    var resText = res.responseText;
                    resolve(JSON.parse(resText));
                })
            } catch (e) {
                reject(e);
            }

        });
    }

    static  makeRequest = function (method, url) {

        // Create the XHR request
        var request = new XMLHttpRequest();

        // Return it as a Promise
        return new Promise(function (resolve, reject) {

            // Setup our listener to process compeleted requests
            request.onreadystatechange = function () {

                // Only run if the request is complete
                if (request.readyState !== 4) return;

                // Process the response
                if (request.status >= 200 && request.status < 300) {
                    // If successful
                    resolve(request);
                } else {
                    // If failed
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                }

            };

            // Setup our HTTP request
            request.open(method || 'GET', url, true);

            // Send the request
            request.send();

        });
    };


}
