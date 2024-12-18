<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  const data = [
    { axis: "30 Dias", Categoria1: 3, Categoria2: 2, Categoria3: 1 },
    { axis: "45 Dias", Categoria1: 2, Categoria2: 2, Categoria3: 3 },
    { axis: "0 Dias", Categoria1: 2, Categoria2: 4, Categoria3: 2 },
    { axis: "15 Dias", Categoria1: 3, Categoria2: 2, Categoria3: 3 },
  ];

  const cardSize = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 20 };
  const chartSize = cardSize - margin.top - margin.bottom - 60; 
  
  const angleSlice = Math.PI * 2 / data.length;
  const categories = ['Categoria1', 'Categoria2', 'Categoria3'];
  const colors = ['#D9B54A', '#F4511E', '#4CAF50'];

  let svg;

  onMount(() => {
    const rScale = d3.scaleLinear()
      .domain([0, 4])
      .range([0, chartSize / 2.5]);

    const svgElement = d3.select(svg);
    const g = svgElement.append('g')
      .attr('transform', `translate(${cardSize/2}, ${margin.top + chartSize/2})`);


    data.forEach((_, i) => {
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', rScale(4) * Math.cos(angleSlice * i - Math.PI/2))
        .attr('y2', rScale(4) * Math.sin(angleSlice * i - Math.PI/2))
        .style('stroke', '#ddd')
        .style('stroke-width', '1px');
    });


    categories.forEach((category, idx) => {
      const points = data.map((d, i) => {
        const value = d[category];
        const x = rScale(value) * Math.cos(angleSlice * i - Math.PI/2);
        const y = rScale(value) * Math.sin(angleSlice * i - Math.PI/2);
        return [x, y];
      });

      g.append('polygon')
        .attr('points', points.map(p => p.join(',')).join(' '))
        .style('fill', colors[idx])
        .style('fill-opacity', '0.3')
        .style('stroke', colors[idx])
        .style('stroke-width', '2px');
    });


    data.forEach((d, i) => {
      g.append('text')
        .attr('x', rScale(4.5) * Math.cos(angleSlice * i - Math.PI/2))
        .attr('y', rScale(4.5) * Math.sin(angleSlice * i - Math.PI/2))
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#666')
        .text(d.axis);
    });
  });
</script>

<div class="card">
  <h2>Detalhes</h2>
  <div class="chart-container">
    <svg 
      bind:this={svg}
      width={cardSize} 
      height={chartSize + margin.top + margin.bottom}
    ></svg>
  </div>
  
  <div class="legend">
    {#each categories as category, i}
      <div class="legend-item">
        <div class="color-box" style="background-color: {colors[i]}"></div>
        <span>{category}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .card {
    width: 300px;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    margin: 1rem;
  }

  h2 {
    font-size: 16px;
      font-weight: bold;
      color: #2d5a4c;
      margin: 8px;
      margin-left: 1rem;
      white-space: nowrap;
  }

  .chart-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .legend {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-bottom: 0.25rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
  }

  .color-box {
    width: 8px;
    height: 8px;
    margin-right: 0.25rem;
    border-radius: 2px;
  }
</style>
