// setup an intercept for all http(s) request/response
(function(xhr) {
    // get handle to the request object prototype
    var XHR = XMLHttpRequest.prototype;

    // get handle to the original functions
    var originalOpen = XHR.open;
    var originalSend = XHR.send;
    var originalSetRequestHeader = XHR.setRequestHeader;

    // set a new function for open
    XHR.open = function(method, url) {
        // save the url for later use
        this._url = url;

        // call the original
        return originalOpen.apply(this, arguments);
    };

    // set a new function for setting headers
    XHR.setRequestHeader = function(header, value) {
        // call the original
        return originalSetRequestHeader.apply(this, arguments);
    };

    // set a new function for sending the request
    XHR.send = function(postData) {
        // add a listener for when the response comes back
        this.addEventListener('load', function() {
            // get a lower case version of the url
            var myUrl = this._url ? this._url.toLowerCase() : this._url;

            // check we have a url
            if (myUrl) {
                // check if it matches a transaction data request
                if (myUrl.indexOf('https://api.usaa.com/v1/enterprise/account-details/demand-deposit/accounts/') !== -1){
                    if (myUrl.indexOf('/transactions?') !== -1){
                        // log
                        console.log('USAA Full Transaction Exporter - intercepted transaction data request')
                        console.log(this.response)

                        // detect if the 'Export' dialog was open to generate this request
                        var elements = document.getElementsByTagName('div')
                        for (const element of elements){
                            if (element.hasAttribute('aria-label')){
                                if (element.getAttribute('aria-label') === 'Export'){
                                    // export dialog was open was lets dump the data to a file that is downloaded

                                    // generate the data to download which is a short header and the actual data response
                                    var data = "data:text/json;charset=utf-8," + this.response;

                                    // encode this as a url that can be downloaded
                                    var encodedUri = encodeURI(data).replace(/#/g, "%23");

                                    // create a clickable link set to this uri
                                    const link = document.createElement("a");    
                                    link.href = encodedUri;

                                    // set the visibility hidden so it will not effect on your web-layout
                                    link.style = "visibility:hidden";
                                    link.download = "full_info.json";

                                    // append the anchor, click it, and then remove it
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                
                                    // the complete data set will be downloaded through your browser into a 'full_info.json' file for your further processing
                                }
                            }
                        };
                    }
                }
            }
        });
        return originalSend.apply(this, arguments);
    };
})(XMLHttpRequest);
