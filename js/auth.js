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

function login() {
    window.alert("working");
    var email = document.getElementById("username").value;
    var password = document.getElementById("pw").value;
    window.alert(email + " " + password);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    // firebase.auth().createWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     window.alert(errorMessage);
    // });
}