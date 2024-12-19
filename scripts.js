// 使用中央氣象局 API 的授權碼
const API_KEY = 'CWA-E772F9E4-EA5C-44E2-B20C-083F82F05DDF';
const API_URL = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=${API_KEY}`;

document.addEventListener('DOMContentLoaded', () => {
  // 初始化地圖
  const map = L.map('map').setView([23.5, 121], 7); // 台灣中心經緯度

  // 加載地圖圖層
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // 獲取地震數據
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const earthquakes = data.records.earthquake;

      if (earthquakes.length > 0) {
        // 取最新一筆地震數據
        const latestEarthquake = earthquakes[0];
        const latitude = parseFloat(latestEarthquake.earthquakeInfo.epicenter.latitude);
        const longitude = parseFloat(latestEarthquake.earthquakeInfo.epicenter.longitude);
        const magnitude = latestEarthquake.earthquakeInfo.magnitude.magnitudeValue;
        const location = latestEarthquake.earthquakeInfo.epicenter.location;
        const originTime = latestEarthquake.earthquakeInfo.originTime;

        // 更新地震資訊到頁面
        document.getElementById('magnitude').textContent = magnitude;
        document.getElementById('arrival-time').textContent = new Date(originTime).toLocaleTimeString();
        document.getElementById('alert').textContent = `⚠️ Earthquake Detected at ${location}`;

        // 在地圖上標記震央
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`Earthquake at ${location}<br>Magnitude: ${magnitude}`)
          .openPopup();

        // 將地圖視角移動到震央
        map.setView([latitude, longitude], 8);
      } else {
        document.getElementById('alert').textContent = 'No recent earthquakes detected.';
      }
    })
    .catch(error => {
      console.error('Error fetching earthquake data:', error);
      document.getElementById('alert').textContent = 'Error fetching earthquake data.';
    });
});
