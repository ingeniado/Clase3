var menuIsOpen = false;
var pages = null;
var currentPage = "page1";
var codigoQR = "";

loadPages = function() {
    pages = {
        page1: document.getElementById("Page-1"),
        page2: document.getElementById("Page-2"),
    }
}

var events = {
    /*
    Eventos de una app en PhoneGap
    --------------------------------
    deviceready
    pause
    resume
    backbutton
    menubutton
    searchbutton
    startcallbutton
    endcallbutton
    volumedownbutton
    volumeupbutton
	*/
	
    deviceReady: function() {
       // console.log("Aplicación iniciada");
       // checkConnection();
    },
    // evento disparado cuando todo el HTML ha sido cargado
    contentLoaded: function() {
        loadPages();
        FastClick.attach(document.body);
    },
    backButton: function() {
        // navigator.app.exitApp();
    },
    
    batteryStatus: function(info) {
        document.getElementById("p-battery").innerHTML = info.level;
    }
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

// listener evento de dispositivo listo
document.addEventListener('deviceready', events.deviceReady, false);
// listener de contenido DOM listo
document.addEventListener('DOMContentLoaded', events.contentLoaded, false);

window.addEventListener("batterystatus", events.batteryStatus, false);

// función click en menú
function menuButtonClick() {    
    if(menuIsOpen) {
        pages[currentPage].className = "body transition center";
        menuIsOpen = false;
    } else {
        pages[currentPage].className = "body transition right";
        menuIsOpen = true;
    }
}

// Funcion cambiar página
function changePage(pageSelected) {
    console.log(pageSelected);
    pages[currentPage].className = "hide";
    
    pages[pageSelected].className = "body right";
    setTimeout(function() {
        pages[pageSelected].className = "body visible transition center";
        currentPage = pageSelected;
        menuIsOpen = false;
    },0);
}

// Funciones de Plugins

function showAlert() {              
    navigator.notification.alert(
        'Esto es una alerta nativa!',  // message
        function() {
            
        },         // callback
        'Titulo',            // title
        'De acuerdo'                  // buttonName
    );
}

function showNoNative() {
    alert("Esta es una alerta desde JavaScript");
}

function showGPS() {
    navigator.geolocation.getCurrentPosition(function(position ) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    }, function() {
        
    });
}


function takePhoto() {
    console.log("Entramos en la función de tomar foto");
    navigator.camera.getPicture(function(imageData) {
        alert(imageData);
        document.getElementById("imagen").src = imageData;
    }, function(message) {
        alert('Failed because: ' + message);
    }, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}

function Vibrate() {
    navigator.notification.vibrate(100);
 
}

function onBatteryStatus(info) {
    // Handle the online event
	console.log("Entramos en la función battery Status");
	alert("Estado de Bateria:");
    console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
}

function scanear(){
		console.log("Entramos en la función canear");
    	cordova.plugins.barcodeScanner.scan(
        //Si el scaneo del barcode Scanner funciona ejecuta la función result
        function (result) {  
            //Guardamos el resultado del código QR o código de barras en una variable
            codigoQR=result.text;
            //Introducimos esa variable en el campo 
			resultado.innerHTML = "La URL es:" + codigoQR + "Correcto";
        }, 
        //Si no, pues ejecuta la función error.
        function (error) {
            notificacion("Ha ocurrido un error al escanear.");
        }
    );
}