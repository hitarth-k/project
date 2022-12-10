
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .catch(function (error) {
      console.log('Service Worker failed to register:', error);
    });
    handlePermission();
}
else {
  console.log('Service Worker is not supported by this browser.');
}

window.fn = {};
handlePermission();

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();

};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

var geoBtn = document.getElementById('geoBtn')

function handlePermission() {
  navigator.permissions.query({ name: 'geolocation' }).then((result) => {
    if (result.state === 'granted') {
      report(result.state);
      navigator.geolocation.getCurrentPosition(showPosition)
    } else if (result.state === 'prompt') {
      report(result.state);
      navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
    } else if (result.state === 'denied') {
      report(result.state);
    }
    result.addEventListener('change', () => {
      report(result.state);
    });
  });
}
function showPosition(position){
  var leti = "Latitude:-"+position.coords.latitude
  var longi = "Longitude:-"+position.coords.longitude
  document.getElementById('latitude').innerHTML = leti
document.getElementById('longitude').innerHTML = longi
}
document.getElementById('showLoc').onclick = () =>{
  handlePermission()
}
function report(state) {
  console.log(`Permission ${state}`);
}
navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", () => {
    updateChargeInfo();
  });
  function updateChargeInfo() {
    console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
  }

  battery.addEventListener("levelchange", () => {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    console.log(`Battery level: ${battery.level * 100}%`);
  }

  battery.addEventListener("chargingtimechange", () => {
    updateChargingInfo();
  });
  function updateChargingInfo() {
    console.log(`Battery charging time: ${battery.chargingTime} seconds`);
  }

  battery.addEventListener("dischargingtimechange", () => {
    updateDischargingInfo();
  });
  function updateDischargingInfo() {
    console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
  }
});