document.addEventListener('DOMContentLoaded', () => {
  const magnitude = document.querySelector('#info .info-card:nth-child(1) p');
  const arrival = document.querySelector('#info .info-card:nth-child(2) p');

  // 模擬更新數據
  setTimeout(() => {
    magnitude.textContent = '4.5';
    arrival.textContent = '5 seconds';
  }, 3000);
});
