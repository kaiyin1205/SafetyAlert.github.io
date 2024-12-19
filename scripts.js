console.log('scripts.js is running!');
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Earthquake Alert</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    #earthquake-data {
      margin-top: 20px;
      padding: 10px;
      background: #f4f4f4;
      border-radius: 5px;
      display: inline-block;
      text-align: left;
    }
  </style>
</head>
<body>
  <h1>Earthquake Alert</h1>
  <p>Fetching latest earthquake data...</p>
  <div id="earthquake-data"></div>

  <script>
    // API URL
    const API_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-002?Authorization=CWA-83D87A3D-4C19-4B1E-8021-AF70E4774117';

    // Fetch earthquake data
    console.log('Starting API request...');
fetch(API_URL)
  .then(response => {
    console.log('Response received:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('API Data:', data);
    // 解析資料並更新畫面
  })
  .catch(error => {
    console.error('Error during fetch:', error);
  });
fetch(API_URL)
  .then(response => {
    console.log('Response received:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('API Data:', data);
    // 解析資料並更新畫面
  })
  .catch(error => {
    console.error('Error during fetch:', error);
  });


        // Display earthquake information
        if (records && records.length > 0) {
          earthquakeContainer.innerHTML = `
            <h2>Latest Earthquake Information</h2>
            <p><strong>Location:</strong> ${records[0].earthquakeInfo.epicenter.location}</p>
            <p><strong>Magnitude:</strong> ${records[0].earthquakeInfo.magnitude.magnitudeValue}</p>
            <p><strong>Depth:</strong> ${records[0].earthquakeInfo.depth.value} km</p>
            <p><strong>Origin Time:</strong> ${records[0].earthquakeInfo.originTime}</p>
          `;
        } else {
          earthquakeContainer.innerHTML = '<p>No recent earthquake data available.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching earthquake data:', error);
        document.getElementById('earthquake-data').innerHTML = '<p>Error fetching earthquake data.</p>';
      });
  </script>
</body>
</html>
