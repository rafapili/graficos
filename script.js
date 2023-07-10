// Dados do arquivo feminicidio.js
var feminicidioData = {
    "data": [
      { "cisp": "CISP 1", "ano": 2022, "mes": "Jan", "feminicidio": 5, "feminicidio_tentativa": 2, "FASE": "FASE 1" },
      { "cisp": "CISP 2", "ano": 2022, "mes": "Fev", "feminicidio": 3, "feminicidio_tentativa": 1, "FASE": "FASE 2" },
      // Adicione mais dados conforme necessário
    ]
  };
  
  // Dados do arquivo bicicletas.js
  var bicicletasData = {
    "data": [
      { "CISP": "CISP 1", "ano": 2022, "mes": "Jan", "Roubo de bicicleta": 10, "Furto de bicicleta": 5 },
      { "CISP": "CISP 2", "ano": 2022, "mes": "Fev", "Roubo de bicicleta": 5, "Furto de bicicleta": 3 },
      // Adicione mais dados conforme necessário
    ]
  };
  
  // Dados do arquivo FrotaVeiculoEstadoANO.js
  var frotaVeiculoAnoData = {
    "data": [
      { "ano": 2020, "frota": 1000 },
      { "ano": 2021, "frota": 1200 },
      { "ano": 2022, "frota": 1500 },
      // Adicione mais dados conforme necessário
    ]
  };
  
  // Dados do arquivo FrotaVeiculoEstadoMES.js
  var frotaVeiculoMesData = {
    "data": [
      { "mes": "Jan", "ano": 2022, "frota": 1300 },
      { "mes": "Fev", "ano": 2022, "frota": 1400 },
      { "mes": "Mar", "ano": 2022, "frota": 1600 },
      // Adicione mais dados conforme necessário
    ]
  };
  
  // Função para extrair os valores de uma propriedade específica dos dados
  function extractData(data, propertyName) {
    return data.map(item => item[propertyName]);
  }
  
  // Função para adicionar os meses aos rótulos dos gráficos
  function addMonthsToLabels(labels, data) {
    return labels.map((label, index) => label + ' ' + data[index].mes);
  }
  
  // Função para atualizar os gráficos com base na seleção do usuário
  function updateCharts(selection) {
    // Limpar os gráficos existentes
    Chart.helpers.each(Chart.instances, function (instance) {
      instance.destroy();
    });
  
    // Atualizar gráfico de crimes
    if (selection === 'crimes') {
      var crimesFeminicidioCtx = document.getElementById('crimesFeminicidioChart').getContext('2d');
      var crimesFeminicidioChart = new Chart(crimesFeminicidioCtx, {
        type: 'bar',
        data: {
          labels: addMonthsToLabels(feminicidioData.data.map(item => item.ano), feminicidioData.data),
          datasets: [
            {
              label: 'Feminicídio',
              data: extractData(feminicidioData.data, 'feminicidio'),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Roubo de Bicicleta',
              data: extractData(bicicletasData.data, 'Roubo de bicicleta'),
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    // Atualizar gráfico de frotas de veículos
    if (selection === 'frotasVeiculos') {
      var frotasVeiculosCtx = document.getElementById('frotasVeiculosChart').getContext('2d');
      var frotasVeiculosChart = new Chart(frotasVeiculosCtx, {
        type: 'line',
        data: {
          labels: addMonthsToLabels(frotaVeiculoAnoData.data.map(item => item.ano), frotaVeiculoMesData.data),
          datasets: [
            {
              label: 'Frota de Veículos (Ano)',
              data: extractData(frotaVeiculoAnoData.data, 'frota'),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Frota de Veículos (Mês)',
              data: extractData(frotaVeiculoMesData.data, 'frota'),
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  
  // Função para obter a seleção do usuário
  function getChartSelection() {
    var radioButtons = document.getElementsByName('chartSelection');
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return radioButtons[i].value;
      }
    }
  }
  
  // Função para atualizar os gráficos com base na seleção do usuário
  function handleChartSelection() {
    var selection = getChartSelection();
    updateCharts(selection);
  }
  
  // Registrar um evento de alteração para atualizar os gráficos quando a seleção do usuário mudar
  var radioButtons = document.getElementsByName('chartSelection');
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', handleChartSelection);
  }
  
  // Chamada inicial para exibir os gráficos com base na seleção padrão
  handleChartSelection();
  