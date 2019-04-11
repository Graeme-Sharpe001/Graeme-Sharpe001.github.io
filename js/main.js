firebase.auth().onAuthStateChanged(function(userSignedIn) {
    if (userSignedIn) {
        // User is signed in.
        document.getElementById("account_div").style.display = "block";
        document.getElementById("signIn_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {
            var email = user.email;
        }
    } else {
        // No user is signed in.
        document.getElementById("signIn_div").style.display = "block";
        document.getElementById("account_div").style.display = "none";
    }
});
//
// function createAccountEmailAndPassword() {
//     window.alert("working");
//     var email = document.getElementById("username").value;
//     var password = document.getElementById("pw").value;
//     window.alert(email + " " + password);
//
//     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//     });
// }
//
// function signInEmailAndPassword() {
//     var email = document.getElementById("username").value;
//     var password = document.getElementById("pw").value;
//
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//     });
// }
//
// function test() {
//         var user = firebase.auth().currentUser;
//
//         if (user != null) {
//             var email = user.email;
//             window.alert(email)
//         } else {
//             window.alert("not working")
//         }
// }