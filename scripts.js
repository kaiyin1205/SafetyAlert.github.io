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

    if (records && records.length > 0) {
      // 顯示最新的地震資訊
      const latestEarthquake = records[0].EarthquakeInfo;

      earthquakeContainer.innerHTML = `
        <h2>Latest Earthquake Information</h2>
        <p><strong>Location:</strong> ${latestEarthquake.Epicenter.Location}</p>
        <p><strong>Magnitude:</strong> ${latestEarthquake.Magnitude.MagnitudeValue}</p>
        <p><strong>Depth:</strong> ${latestEarthquake.Depth.Value} km</p>
        <p><strong>Origin Time:</strong> ${latestEarthquake.OriginTime}</p>
      `;
    } else if (records === undefined) {
      // 如果 records 為 undefined，顯示提示
      earthquakeContainer.innerHTML = '<p>Error: Earthquake data is undefined. Please check the API response structure.</p>';
    } else {
      // 如果 records 為空，顯示無資料
      earthquakeContainer.innerHTML = '<p>No recent earthquake data available.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching earthquake data:', error);
    document.getElementById('earthquake-data').innerHTML = '<p>Error fetching earthquake data.</p>';
  });
