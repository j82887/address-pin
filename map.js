(function(){

let point=null,timer;
const frame=document.getElementById('inline-map');
const status=document.getElementById('map-status');
function load(){
  if(!point)return;
  const [lon,lat]=point;
  const params=new URLSearchParams({q:`${lat},${lon}`,z:'16',hl:'zh-TW',output:'embed'});
  status.textContent='地圖載入中…';status.hidden=false;
  clearTimeout(timer);
  frame.src='https://maps.google.com/maps?'+params;
  timer=setTimeout(()=>{status.textContent='地圖載入較慢，可使用下方 Google Maps 按鈕'},15000);
}
frame.addEventListener('load',()=>{clearTimeout(timer);status.hidden=true});
frame.addEventListener('error',()=>{clearTimeout(timer);status.textContent='地圖暫時無法載入，可使用下方 Google Maps 按鈕';status.hidden=false});
function show(lon,lat){if(!Number.isFinite(lon)||!Number.isFinite(lat))return;point=[lon,lat];load()}
function clear(){point=null;clearTimeout(timer);frame.removeAttribute('src');status.hidden=true}
document.getElementById('recenter').onclick=load;
window.PinMap={show,clear};
})();
