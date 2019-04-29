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
firebase.auth().onAuthStateChanged(function(userSignedIn) {
    if (userSignedIn) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {
            var email = user.email;
        }
    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        window.alert("not signed in");
    }
});

function wsTest() {
    init();
    const wsAggTrade = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@aggTrade', undefined);

    wsAggTrade.onmessage = function incoming(event) {
        // console.log(event.data);

        var msg = JSON.parse(event.data);
        var currentPrice = msg.p;
        document.getElementById("currentPrice").innerHTML = currentPrice;
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
    };

    function init() {
        var db = firebase.firestore();

        var user = firebase.auth().currentUser;
        window.alert(user.email);

        var docRef = db.collection("users").doc(user.email);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                console.log("Username: ", doc.data().username);
                document.getElementById("name").innerText = "Username: " + doc.get("username");
                document.getElementById("initDollars").innerText = "Initial Dollars: " + doc.get("initUSD");
                document.getElementById("portValue").innerText = "Current Portfolio Value: " + doc.get("portval");
                document.getElementById("usd").innerText = "USD: " + doc.get("usd");
                document.getElementById("btc").innerText = "BTC: " + doc.get("btc");
                document.getElementById("profit").innerText = "Profit: " + doc.get("profit");
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })
    }
}




    function buy() {
        let amount = document.getElementById(buy).innerHTML;
        let price = document.getElementById("currentPrice").innerHTML;
        window.alert(amount + " " + price);

    }

    function sell() {
        // // Initialize Cloud Firestore through Firebase
        // firebase.initializeApp({
        //     apiKey: "AIzaSyBU8qTyI8KRLzFt6X-lQQDIQKPefeFZiP4",
        //     authDomain: "graeme-sharpe-website.firebaseapp.com",
        //     projectId: 'graeme-sharpe-website'
        // });

        var db = firebase.firestore();

        var user = firebase.auth().currentUser;
        window.alert(user.email);

        var docRef = db.collection("users").doc(user.email);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        // db.collection("users").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} => ${doc.data()}`);
        //     });
        // });

    }