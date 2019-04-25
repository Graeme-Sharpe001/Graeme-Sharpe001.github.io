// function test() {
//     var burl = "https://api.binance.com";
//
//     var query = '/api/v1/time';
//
//     // query += '?symbol=BTCUSDT&interval=15&limit=2';
//
//     var url = burl + query;
//
//     window.alert(url);
//
//     var request = new XMLHttpRequest();
//
//     request.open('GET', url, true);
//     request.onload = function() {
//         console.log(request.responseText);
//     }
//     request.send();
// }

function wsTest() {
    const wsAggTrade = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@aggTrade', undefined);

    wsAggTrade.onmessage = function incoming(event) {
        // console.log(event.data);

        var msg = JSON.parse(event.data);
        var currentPrice = msg.p;
        document.getElementById("currentPrice").innerHTML = currentPrice;
        // var li = document.createElement("li");
        // li.appendChild(document.createTextNode(currentPrice));
        // document.getElementById("orderBook").appendChild(li);

        // switch (msg.type) {
        //     case "p":
        //         text = "Price: " + msg.p;
        //         console.log(text);
        // }
    };

    const wsDepth = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth10', undefined);

    wsDepth.onmessage = function incoming(event) {
        // console.log(event.data);
        var msg = JSON.parse(event.data);


        var asks = msg.asks;
        var bids = msg.bids;

        var liAsks = document.getElementById("asks").getElementsByTagName("li");
        var liBids = document.getElementById("bids").getElementsByTagName("li");

        for (i = 0; i < asks.length; i++) {
            console.log(asks[i]);
            console.log(bids[i]);


            var lia = document.createElement("li");
            lia.appendChild(document.createTextNode(asks[i]));
            document.getElementById("asks").appendChild(lia);
            document.getElementById("asks").removeChild(liAsks[i]);

            var lib = document.createElement("li");
            lib.appendChild(document.createTextNode(bids[i]));
            document.getElementById("bids").appendChild(lib);
            document.getElementById("bids").removeChild(liBids[i]);

        }
        //
        // for(i = 0, il = liAsks.length;i<il;i++) {
        //     document.getElementById("asks").removeChild(liAsks[i]);
        //     document.getElementById("bids").removeChild(liBids[i]);
        // }

        // document.getElementById("currentPrice").innerHTML = currentPrice;


        // switch (msg.type) {
        //     case "p":
        //         text = "Price: " + msg.p;
        //         console.log(text);
        // }
    };
}