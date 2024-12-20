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

    const records = data.records.earthquake;
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
    } else {
      // 如果 `records` 為空，顯示最後一筆地震資料
      const latestEarthquake = data.result.records[data.result.records.length - 1];
      if (latestEarthquake) {
        earthquakeContainer.innerHTML = `
          <h2>Last Earthquake Information</h2>
          <p><strong>Location:</strong> ${latestEarthquake.EarthquakeInfo.Epicenter.Location}</p>
          <p><strong>Magnitude:</strong> ${latestEarthquake.EarthquakeInfo.Magnitude.MagnitudeValue}</p>
          <p><strong>Depth:</strong> ${latestEarthquake.EarthquakeInfo.Depth.Value} km</p>
          <p><strong>Origin Time:</strong> ${latestEarthquake.EarthquakeInfo.OriginTime}</p>
        `;
      } else {
        earthquakeContainer.innerHTML = '<p>No earthquake data available.</p>';
      }
    }
  })
  .catch(error => {
    console.error('Error fetching earthquake data:', error);
    document.getElementById('earthquake-data').innerHTML = '<p>Error fetching earthquake data.</p>';
  });
