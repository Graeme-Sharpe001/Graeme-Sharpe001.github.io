function checkLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email.toString());
    console.log(password.toString());
    console.log("You clicked login");

    firebase.auth().signInWithEmailAndPassword(email.toString(), password.toString()).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Log in Success.");
            showPageElement("vision");
        } else {
            console.log("Log in Failed.");
        }
    });

}

function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email.toString(), password.toString()).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    
}

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log("Sign out successful.");
        hidePageElement("vision");
    }).catch(function(error) {
        // An error happened.
    });
}

function displayRats() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    console.log(start);
    console.log(end);

    var map = myMap();

    var scoresRef = firebase.database().ref();
    scoresRef.orderByChild("Created Date Int").startAt(start).endAt(end).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            console.log(data.valueOf("Latitude"));
            console.log("Lat And Long : " + data.Latitude + " " + data.Longitude);

            var key = childSnapshot.child("Unique Key").val();
            var address = childSnapshot.child("Incident Address").val();
            if (key == null || address == null) {
                key = childSnapshot.child("UniqueKey").val();
                address = childSnapshot.child("IncidentAddress").val();
            }

            var myLatLng = {lat: parseFloat(data.Latitude), lng: parseFloat(data.Longitude)};

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: key
            });
        });
    });


}

function showPageElement(what)
{
    var obj = typeof what == 'object'
        ? what : document.getElementById(what);

    obj.style.display = 'block';
    return false;
}

function hidePageElement(what)
{
    var obj = typeof what == 'object'
        ? what : document.getElementById(what);

    obj.style.display = 'none';
    return false;
}

function fillTable() {
    console.log("On Load");
    var table = document.getElementById("recentRats");
    var elmtTable = document.getElementById("recentRats");
    var tableRows = elmtTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    while(table.rows.length > 1) {
        table.deleteRow(-1);
    }

    var scoresRef = firebase.database().ref();
    scoresRef.orderByChild("Created Date Int").limitToFirst(10).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            console.log("test :" + childSnapshot.valueOf().toString());

            var key = childSnapshot.child("Unique Key").val();
            var address = childSnapshot.child("Incident Address").val();
            if (key == null || address == null) {
                key = childSnapshot.child("UniqueKey").val();
                address = childSnapshot.child("IncidentAddress").val();
            }
            var borough = childSnapshot.child("Borough").val();
            var lat = data.Latitude;
            var long = data.Longitude;
            var city = data.City;

            var info = [key, city, borough, address, lat, long];

            var columns = ['Unique Key', 'City', 'Borough', 'Address', 'Latitude', 'Longitude'];

            var row = table.insertRow( -1 ); // -1 is insert as last
            for( var j = 0; j < columns.length; j++ ){
                var cell = row.insertCell( - 1 ); // -1 is insert as last
                cell.className = columns[j]; //
                cell.innerHTML = info[j];
            }
        });
    });

}

function graph() {
    var year;
    if (document.getElementById("year") != null) {
        year = document.getElementById("year").value;
    } else {
        year = 2016;
    }
    var start = year + "0101";
    var q1 = document.getElementById("year").value + "0301";
    var q2 = document.getElementById("year").value + "0601";
    var q3 = document.getElementById("year").value + "0901";
    var end = document.getElementById("year").value + "1231";
    console.log(year + " " + q1 + " " + q2 + " " + q3 + " " + end);

    var count;
    var count1;
    var count2;
    var count3;

    var scoresRef = firebase.database().ref();
    scoresRef.orderByChild("Created Date Int").startAt(start).endAt(q1).on("value", function(snapshot) {
        count = 0;
        snapshot.forEach(function(childSnapshot) {
            count = count + 1;
            var data = childSnapshot.val();
        });
        console.log(count);
    });

    scoresRef.orderByChild("Created Date Int").startAt(q1).endAt(q2).on("value", function(snapshot) {
        count1 = 0;
        snapshot.forEach(function(childSnapshot) {
            count1 = count1 + 1;
            var data = childSnapshot.val();
        });
        console.log(count1);
    });

    scoresRef.orderByChild("Created Date Int").startAt(q2).endAt(q3).on("value", function(snapshot) {
        count2 = 0;
        snapshot.forEach(function(childSnapshot) {
            count2 = count2 + 1;
            var data = childSnapshot.val();
        });
        console.log(count2);
    });

    scoresRef.orderByChild("Created Date Int").startAt(q3).endAt(end).on("value", function(snapshot) {
        count3 = 0;
        snapshot.forEach(function(childSnapshot) {
            count3 = count3 + 1;
            var data = childSnapshot.val();
        });
        console.log(count3);
    });

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Historic Rat Sightings"
        },
        axisY:{
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: [
                { x: new Date(parseInt(year), 01, 1), y: count },
                { x: new Date(parseInt(year), 04, 1), y: count1 },
                { x: new Date(parseInt(year), 08, 1), y: count2 },
                { x: new Date(parseInt(year), 012, 1), y: count3 }
            ]
        }]
    });
    chart.render();
}

function graphByBorough() {
    var count;
    var count1;
    var count2;
    var count3;
    var count4;

    var scoresRef = firebase.database().ref();
    scoresRef.orderByChild("Borough").startAt("STATEN ISLAN").endAt("STATEN ISLANH").on("value", function(snapshot) {
        count = 0;
        snapshot.forEach(function(childSnapshot) {
            count = count + 1;
            var data = childSnapshot.val();
        });
        console.log(count);
    });

    scoresRef.orderByChild("Borough").startAt("QUEE").endAt("QUEENZ").on("value", function(snapshot) {
        count1 = 0;
        snapshot.forEach(function(childSnapshot) {
            count1 = count1 + 1;
            var data = childSnapshot.val();
        });
        console.log(count1);
    });

    scoresRef.orderByChild("Borough").startAt("MANHATT").endAt("MANHATTAY").on("value", function(snapshot) {
        count2 = 0;
        snapshot.forEach(function(childSnapshot) {
            count2 = count2 + 1;
            var data = childSnapshot.val();
        });
        console.log(count2);
    });

    scoresRef.orderByChild("Borough").startAt("BROOKLY").endAt("BROOKLYO").on("value", function(snapshot) {
        count3 = 0;
        snapshot.forEach(function(childSnapshot) {
            count3 = count3 + 1;
            var data = childSnapshot.val();
        });
        console.log(count3);
    });

    scoresRef.orderByChild("Borough").startAt("BRON").endAt("BRONZ").on("value", function(snapshot) {
        count4 = 0;
        snapshot.forEach(function(childSnapshot) {
            count4 = count4 + 1;
            var data = childSnapshot.val();
        });
        console.log(count4);
    });

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Historic Rat Sightings"
        },
        axisY:{
            includeZero: true
        },
        data: [{
            type: "bar",
            dataPoints: [
                { label: "Staten Island", y: count },
                { label: "Queens", y: count1 },
                { label: "Manhatten", y: count2 },
                { label: "Brooklynn", y: count3 },
                { label: "Bronx", y: count4 }
            ]
        }]
    });
    chart.render();
}

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(40.713, -74.006),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    return map;
}

function newRatForm() {
    var bor = document.getElementById("borough").value;
    var city = document.getElementById("city").value;
    var date = document.getElementById("date").value;
    var dateInt = document.getElementById("date int").value;
    var address = document.getElementById("address").value;
    var zip = document.getElementById("zip").value;
    var type = document.getElementById("type").value;
    var lat = document.getElementById("lat").value;
    var long = document.getElementById("long").value;
    var key = document.getElementById("key").value;

    // console.log("On Load");
    // var table = document.getElementById("recentRats");
    //
    // var columns = ['Unique Key', 'City', 'Borough', 'Latitude', 'Longitude'];
    //
    // var info = [key, city, bor, lat, long];
    //
    // var row = table.insertRow(0); // first row
    // for( var j = 0; j < columns.length; j++ ){
    //     var cell = row.insertCell( - 1 ); // -1 is insert as last
    //     cell.className = columns[j]; //
    //     cell.innerHTML = info[j];
    // }

    var randomNumberBetween0and19 = Math.floor(Math.random() * 2000);

    firebase.database().ref("rat" + randomNumberBetween0and19).set({
        UniqueKey : key,
        City: city,
        Borough : bor,
        IncidentAddress : address,
        Latitude : lat,
        Longitude : long
    });

    fillTable();

}