<script>
  // Lista de insights
  let insights = [
    "Temperatura média estável nas últimas 24 horas.",
    "Umidade abaixo do ideal. Considere irrigar a lavoura.",
    "Previsão de chuva nos próximos 3 dias. Ajuste a irrigação.",
    "Temperatura acima de 30°C. Verifique se as plantas estão sob estresse térmico.",
  ];
</script>

<style>
  .insights-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  .insights-header {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #333;
  }

  .insights-list {
    list-style: none;
    padding: 0;
  }

  .insight-item {
    background: #f0f8ff;
    border-left: 4px solid #007acc;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
  }
</style>

<div class="insights-container">
  <h1 class="insights-header">Insights</h1>
  <ul class="insights-list">
    {#each insights as insight}
      <li class="insight-item">{insight}</li>
    {/each}
  </ul>
</div>
