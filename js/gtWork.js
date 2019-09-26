function expands(element) {

    var x = document.getElementById(element);

    if (x.style.display == "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

}