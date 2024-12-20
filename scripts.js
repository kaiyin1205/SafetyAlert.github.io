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

    const records = data.records?.earthquake; // 使用可選鏈接操作符

    const earthquakeContainer = document.getElementById('earthquake-data');

    if (records && records.length > 0) {
      // 顯示最新的地震資訊
      earthquakeContainer.innerHTML = `
        <h2>Latest Earthquake Information</h2>
        <p><strong>Location:</strong> ${records[0].EarthquakeInfo.Epicenter.Location}</p>
        <p><strong>Magnitude:</strong> ${records[0].EarthquakeInfo.Magnitude.MagnitudeValue}</p>
        <p><strong>Depth:</strong> ${records[0].EarthquakeInfo.Depth.Value} km</p>
        <p><strong>Origin Time:</strong> ${records[0].EarthquakeInfo.OriginTime}</p>
      `;
    } else if (records === undefined) {
      earthquakeContainer.innerHTML = '<p>Error: Earthquake data is undefined. Please check the API response structure.</p>';
    } else {
      earthquakeContainer.innerHTML = '<p>No recent earthquake data available.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching earthquake data:', error);
    document.getElementById('earthquake-data').innerHTML = '<p>Error fetching earthquake data.</p>';
  });
