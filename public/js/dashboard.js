var latvar = document.getElementById("lat").value
var lonvar = document.getElementById("lon").value

function showAlert() {
    const category = document.getElementById("category").value
    const name = document.getElementById("itemName").value
    const price = document.getElementById("price").value
    if (price.length > 0 && name.length > 0 && category.length > 0) document.getElementById("alert1").style.display = "block";
    else document.getElementById("alert2").style.display = "block";
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, hidePosition);
    } else {
        alert("Geolocation is not supported by this browser. Now we trying to get your location through your IP address.");
        ipPosition();
    }
}
function showPosition(position) {
    document.getElementById("lat").value = parseFloat(position.coords.latitude),
        document.getElementById("lon").value = parseFloat(position.coords.longitude)
}

function hidePosition(position) {
    alert('User denied the access of the position. Now we trying to get your location through your IP address.');
    ipPosition();
}
function ipPosition() {
    const url = "https://ipinfo.io/?token=" + process.env.IP_KEY
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var loc = result.loc.split(',');
            console.log(loc)
            document.getElementById("lat").value = parseFloat(loc[0]),
                document.getElementById("lon").value = parseFloat(loc[1])
        }
    })
}





