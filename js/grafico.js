const ctx = document.getElementById('graficoRosca');

new Chart(ctx, {
  type: 'doughnut', // tipo rosca
  data: {
    labels: ['Negras', 'Brancas'],
    datasets: [{
      data: [87.8, 12.2], // valores
      backgroundColor: ['#8B0000', '#FF9999'], // tons de vermelho
      borderColor: '#fff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    animation: {
      animateScale: true, // anima o tamanho
      animateRotate: true // anima a rotação ao carregar
    },
    plugins: {
      legend: {
        position: 'bottom' // legenda embaixo
      }
    }
  }
});
