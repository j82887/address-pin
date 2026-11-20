const input = document.getElementById('point');
const result = document.getElementById('result');
const message = document.getElementById('status');

function parsePoint(value) {
  const fields = value.normalize('NFKC').trim().split(/\s*[,、;]\s*|\s+/);
  if (fields.length !== 2 || !fields.every(field => /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(field))) return null;
  const [lat, lon] = fields.map(Number);
  return Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? [lat, lon] : null;
}

input.addEventListener('input', () => {
  if (!result.hidden) window.PinMap.clear();
  result.hidden = true;
  message.textContent = '';
});

document.getElementById('coordinates').addEventListener('submit', event => {
  event.preventDefault();
  const point = parsePoint(input.value);
  if (!point) {
    message.textContent = '請依序輸入緯度（−90 至 90）、經度（−180 至 180）。';
    input.focus();
    return;
  }
  const [lat, lon] = point;
  result.hidden = false;
  window.PinMap.show(lon, lat);
  document.getElementById('map-link').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(point.join(','));
});
