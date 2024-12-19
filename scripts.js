// 使用你的授權碼
const API_KEY = 'CWA-E772F9E4-EA5C-44E2-B20C-083F82F05DDF';
const API_URL = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=${API_KEY}`;

document.addEventListener('DOMContentLoaded', () => {
  const magnitudeElement = document.querySelector('#info .info-card:nth-child(1) p');
  const arrivalElement = document.querySelector('#info .info-card:nth-child(2) p');
  const alertElement = document.getElementById('alert');

  // 從中央氣象局 API 獲取地震數據
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const earthquakes = data.records.earthquake;

      if (earthquakes.length > 0) {
        const latestEarthquake = earthquakes[0];
        const magnitude = latestEarthquake.earthquakeInfo.magnitude.magnitudeValue;
        const location = latestEarthquake.earthquakeInfo.epicenter.location;
        const originTime = latestEarthquake.earthquakeInfo.originTime;

        // 更新地震數據到網頁
        magnitudeElement.textContent = magnitude;
        arrivalElement.textContent = new Date(originTime).toLocaleTimeString();
        alertElement.textContent = `⚠️ Earthquake Detected at ${location} (Magnitude: ${magnitude})`;
      } else {
        alertElement.textContent = 'No recent earthquakes detected.';
      }
    })
    .catch(error => {
      console.error('Error fetching earthquake data:', error);
      alertElement.textContent = 'Error fetching earthquake data.';
    });
});
