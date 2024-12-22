console.log('scripts.js is running!');

const API_URL = 'https://cors-anywhere.herokuapp.com/https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-002?Authorization=CWA-83D87A3D-4C19-4B1E-8021-AF70E4774117';

console.log('Starting API request...');

// Fetch earthquake data
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
    const magnitudeThreshold = document.getElementById('magnitude-threshold').value;

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
      } else {
        earthquakeContainer.innerHTML = '<p>No earthquakes match your notification settings.</p>';
      }
    } else {
      earthquakeContainer.innerHTML = '<p>No recent earthquake data available.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching earthquake data:', error);
    document.getElementById('earthquake-data').innerHTML = '<p>Error fetching earthquake data.</p>';
  });

// 設定監聽事件，更新設定時重新觸發 API 請求
document.getElementById('magnitude-threshold').addEventListener('change', () => {
  console.log('Threshold updated, re-fetching data...');
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // 同步更新地震資料
      console.log('Threshold filter applied. Fetching data based on new threshold.');
    });
});
