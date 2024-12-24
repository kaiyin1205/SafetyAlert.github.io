console.log('scripts.js is running!');

const API_URL = 'https://cors-anywhere.herokuapp.com/https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-002?Authorization=CWA-83D87A3D-4C19-4B1E-8021-AF70E4774117';

console.log('Starting API request...');

let updateInterval = 300000; // Default: 5 minutes (in milliseconds)

function fetchEarthquakeData() {
  console.log('Fetching earthquake data...');
  const alertElement = document.getElementById('alert');
  alertElement.textContent = 'Updating earthquake data...';

  fetch(API_URL)
    .then(response => {
      console.log('Response received:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Full API Response:', data);

      // 確認 records 的路徑是否正確
      const records = data.result?.records?.earthquake;

      const earthquakeContainer = document.getElementById('earthquake-data');
      const magnitudeThreshold = document.getElementById('threshold').value;

      if (records && records.length > 0) {
        // 過濾符合條件的地震資料
        const filteredRecords = records.filter(
          eq => eq.EarthquakeInfo.Magnitude.MagnitudeValue >= magnitudeThreshold
        );

        if (filteredRecords.length > 0) {
          const latestEarthquake = filteredRecords[0].EarthquakeInfo;

          earthquakeContainer.innerHTML = `
            <h2>Latest Earthquake Information</h2>
            <p><strong>Location:</strong> ${latestEarthquake.Epicenter.Location}</p>
            <p><strong>Magnitude:</strong> ${latestEarthquake.Magnitude.MagnitudeValue}</p>
            <p><strong>Depth:</strong> ${latestEarthquake.Depth.Value} km</p>
            <p><strong>Origin Time:</strong> ${latestEarthquake.OriginTime}</p>
          `;

          // 如果有偵測到地震，設定為30秒更新一次
          updateInterval = 30000;
        } else {
          earthquakeContainer.innerHTML = '<p>No earthquakes match your notification settings.</p>';

          // 如果沒有偵測到地震，設定為5分鐘更新一次
          updateInterval = 300000;
        }
      } else {
        earthquakeContainer.innerHTML = '<p>No recent earthquake data available.</p>';

        // 如果沒有地震資料，設定為5分鐘更新一次
        updateInterval = 300000;
      }

      // 更新自動刷新時間
      resetAutoRefresh();

      alertElement.textContent = 'Earthquake data updated successfully.';
    })
    .catch(error => {
      console.error('Error fetching earthquake data:', error);
      document.getElementById('earthquake-data').innerHTML = '<p>Error fetching earthquake data.</p>';
      alertElement.textContent = 'Error updating earthquake data.';
    });
}

function showThresholdMessage() {
  const selectedValue = document.getElementById('threshold').value;
  alert(`Notification threshold set to: ${selectedValue} or above`);
}

let autoRefresh;

function resetAutoRefresh() {
  clearInterval(autoRefresh);
  autoRefresh = setInterval(fetchEarthquakeData, updateInterval);
}

// 初始化資料並開始自動刷新
fetchEarthquakeData();

// 監聽使用者更改通知級數設定
const thresholdElement = document.getElementById('threshold');
thresholdElement.addEventListener('change', showThresholdMessage);
