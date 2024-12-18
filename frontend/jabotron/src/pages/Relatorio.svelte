<script>
  import jsPDF from "jspdf"; // Biblioteca para exportação em PDF
  import "jspdf-autotable"; // Plugin para tabelas no jsPDF

  // Dados de exemplo
  let reportData = [
    { date: "2024-12-10", temperature: "27°C", humidity: "65%", observation: "Condições ideais" },
    { date: "2024-12-11", temperature: "30°C", humidity: "55%", observation: "Umidade baixa, irrigação recomendada" },
    { date: "2024-12-12", temperature: "29°C", humidity: "70%", observation: "Previsão de chuva" },
  ];

  // Exportar relatório em PDF
  function exportToPDF() {
    const doc = new jsPDF();
    doc.text("Relatório de Monitoramento", 14, 20);

    doc.autoTable({
      head: [["Data", "Temperatura", "Umidade", "Observação"]],
      body: reportData.map(({ date, temperature, humidity, observation }) => [
        date,
        temperature,
        humidity,
        observation,
      ]),
      startY: 30,
    });

    doc.save("Relatorio_Monitoramento.pdf");
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  .header {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #333;
  }

  .table-container {
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    color: #333;
  }

  .btn-export {
    display: inline-block;
    background-color: #007acc;
    color: #fff;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 1rem;
  }

  .btn-export:hover {
    background-color: #005fa3;
  }
</style>

<div class="container">
  <h1 class="header">Relatórios</h1>

  <!-- Tabela -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Temperatura</th>
          <th>Umidade</th>
          <th>Observação</th>
        </tr>
      </thead>
      <tbody>
        {#each reportData as row}
          <tr>
            <td>{row.date}</td>
            <td>{row.temperature}</td>
            <td>{row.humidity}</td>
            <td>{row.observation}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Botão para exportar -->
  <button class="btn-export" on:click={exportToPDF}>
    Exportar PDF
  </button>
</div>
