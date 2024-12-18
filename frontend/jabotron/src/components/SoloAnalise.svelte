<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { writable } from "svelte/store";

    // Função para gerar valores aleatórios dentro de uma faixa
    function generateRandomData(base, variance) {
        return base + Math.floor(Math.random() * variance * 2) - variance;
    }

    // Dados semanais
    const weeklyData = [
        {
            year: 2024.0,
            weekday: "Segunda",
            Nitrogênio: generateRandomData(30, 5),
            Fósforo: generateRandomData(40, 5),
            Potássio: generateRandomData(35, 5),
        },
        {
            year: 2024.2,
            weekday: "Terça",
            Nitrogênio: generateRandomData(32, 5),
            Fósforo: generateRandomData(41, 5),
            Potássio: generateRandomData(37, 5),
        },
        {
            year: 2024.4,
            weekday: "Quarta",
            Nitrogênio: generateRandomData(33, 5),
            Fósforo: generateRandomData(43, 5),
            Potássio: generateRandomData(39, 5),
        },
        {
            year: 2024.6,
            weekday: "Quinta",
            Nitrogênio: generateRandomData(34, 5),
            Fósforo: generateRandomData(44, 5),
            Potássio: generateRandomData(40, 5),
        },
        {
            year: 2024.8,
            weekday: "Sexta",
            Nitrogênio: generateRandomData(35, 5),
            Fósforo: generateRandomData(45, 5),
            Potássio: generateRandomData(42, 5),
        },
    ];

    // Dados mensais
    const monthlyData = [
        {
            year: 2020,
            month: "Jan",
            Nitrogênio: generateRandomData(28, 5),
            Fósforo: generateRandomData(35, 5),
            Potássio: generateRandomData(30, 5),
        },
        {
            year: 2021,
            month: "Mar",
            Nitrogênio: generateRandomData(32, 5),
            Fósforo: generateRandomData(38, 5),
            Potássio: generateRandomData(33, 5),
        },
        {
            year: 2022,
            month: "Jun",
            Nitrogênio: generateRandomData(35, 5),
            Fósforo: generateRandomData(41, 5),
            Potássio: generateRandomData(37, 5),
        },
        {
            year: 2023,
            month: "Set",
            Nitrogênio: generateRandomData(38, 5),
            Fósforo: generateRandomData(45, 5),
            Potássio: generateRandomData(40, 5),
        },
        {
            year: 2024,
            month: "Dez",
            Nitrogênio: generateRandomData(42, 5),
            Fósforo: generateRandomData(48, 5),
            Potássio: generateRandomData(43, 5),
        },
    ];

    // Dados trimestrais
    const quarterlyData = [
        {
            year: 2023.0,
            quarter: "1º Tri",
            Nitrogênio: generateRandomData(34, 5),
            Fósforo: generateRandomData(42, 5),
            Potássio: generateRandomData(36, 5),
        },
        {
            year: 2023.25,
            quarter: "2º Tri",
            Nitrogênio: generateRandomData(36, 5),
            Fósforo: generateRandomData(44, 5),
            Potássio: generateRandomData(38, 5),
        },
        {
            year: 2023.5,
            quarter: "3º Tri",
            Nitrogênio: generateRandomData(38, 5),
            Fósforo: generateRandomData(46, 5),
            Potássio: generateRandomData(41, 5),
        },
        {
            year: 2023.75,
            quarter: "4º Tri",
            Nitrogênio: generateRandomData(40, 5),
            Fósforo: generateRandomData(48, 5),
            Potássio: generateRandomData(43, 5),
        },
    ];

    const lineData = [
        { name: "Nitrogênio", color: "#b3e5fc" },
        { name: "Fósforo", color: "#ffe0b2" },
        { name: "Potássio", color: "#ffccbc" },
    ];

    let svgElement;
    let chartContainer;
    const interval = writable("mensalmente");
    let currentData = monthlyData;
    let resizeObserver;

    function getLabelForAxis(interval) {
        switch (interval) {
            case "semanalmente":
                return (d) => d.weekday;
            case "mensalmente":
                return (d) => d.month;
            case "trimestralmente":
                return (d) => d.quarter;
        }
    }

    function updateChart() {
        if (!chartContainer) return;

        const selectedInterval = $interval;

        switch (selectedInterval) {
            case "semanalmente":
                currentData = weeklyData;
                break;
            case "mensalmente":
                currentData = monthlyData;
                break;
            case "trimestralmente":
                currentData = quarterlyData;
                break;
        }

        const containerWidth = chartContainer.clientWidth;
        const containerHeight = chartContainer.clientHeight;

        const margin = {
            top: 20,
            right: containerWidth <= 750 ? 40 : 120,
            bottom: 60,
            left: containerWidth <= 750 ? 30 : 40,
        };

        const width = containerWidth;
        const height = containerHeight;
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        d3.select(svgElement).selectAll("*").remove();

        const svg = d3
            .select(svgElement)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Escalas
        const xScale = d3
            .scalePoint()
            .domain(currentData.map(getLabelForAxis(selectedInterval)))
            .range([0, chartWidth]);

        const yScale = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(currentData, (d) =>
                    Math.max(d.Nitrogênio, d.Fósforo, d.Potássio),
                ) + 5,
            ])
            .range([chartHeight, 0]);

        // Eixos
        svg.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(d3.axisBottom(xScale))
            .style("font-size", containerWidth < 480 ? "8px" : "10px")
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)");

        svg.append("g")
            .call(d3.axisLeft(yScale))
            .style("font-size", containerWidth < 480 ? "8px" : "10px");

        // Gerador de linhas
        const lineGenerator = d3
            .line()
            .curve(d3.curveCatmullRom)
            .x((d) => xScale(getLabelForAxis(selectedInterval)(d)))
            .y((d) => yScale(d.value));

        // Adiciona as linhas com animação
        lineData.forEach((line) => {
            const lineDataPoints = currentData.map((d) => ({
                ...d,
                value: d[line.name],
            }));

            const path = svg
                .append("path")
                .datum(lineDataPoints)
                .attr("class", "line")
                .attr("d", lineGenerator)
                .style("fill", "none")
                .style("stroke", line.color)
                .style("stroke-width", containerWidth < 480 ? 1.5 : 2)
                .style("opacity", 0.8);

            // Animação da linha
            const pathLength = path.node().getTotalLength();
            path.attr("stroke-dasharray", pathLength + " " + pathLength)
                .attr("stroke-dashoffset", pathLength)
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0);

            // Adiciona pontos
            svg.selectAll(`.point-${line.name}`)
                .data(lineDataPoints)
                .enter()
                .append("circle")
                .attr("class", `point-${line.name}`)
                .attr("cx", (d) => xScale(getLabelForAxis(selectedInterval)(d)))
                .attr("cy", (d) => yScale(d[line.name]))
                .attr("r", containerWidth < 480 ? 2 : 3)
                .style("fill", line.color)
                .style("stroke", "white")
                .style("stroke-width", containerWidth < 480 ? 1 : 1.5);
        });

        // Legenda
        if (containerWidth > 750) {
            const legend = svg
                .append("g")
                .attr("class", "legend")
                .attr("transform", `translate(${chartWidth + 10}, 0)`);

            lineData.forEach((line, i) => {
                const legendItem = legend
                    .append("g")
                    .attr("transform", `translate(0, ${i * 20})`);

                legendItem
                    .append("circle")
                    .attr("r", 5)
                    .style("fill", line.color);

                legendItem
                    .append("text")
                    .attr("x", 10)
                    .attr("y", 0)
                    .attr("dy", ".35em")
                    .style("fill", "#666")
                    .style("font-size", "11px")
                    .text(line.name);
            });
        }
    }

    function handleResize() {
        if (chartContainer) {
            updateChart();
        }
    }

    onMount(() => {
        resizeObserver = new ResizeObserver(handleResize);
        if (chartContainer) {
            resizeObserver.observe(chartContainer);
        }
        updateChart();

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    });

    function changeInterval(event) {
        interval.set(event.target.value);
        updateChart();
    }
</script>

<div class="outer-container">
    <div class="card">
        <div class="header">
            <h2 class="chart-title">Nível de Nutrientes</h2>
            <div class="dropdown">
                <select on:change={changeInterval} class="select-styled">
                    <option value="semanalmente">Semanalmente</option>
                    <option value="mensalmente" selected>Mensalmente</option>
                    <option value="trimestralmente">Trimestralmente</option>
                </select>
            </div>
        </div>
        <div class="chart-container" bind:this={chartContainer}>
            <svg bind:this={svgElement}></svg>
        </div>
    </div>
</div>

<style>
    .outer-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        overflow: hidden;
    }

    .card {
        background-color: white;
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 0;
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        transition: box-shadow 0.3s ease;
        margin-top: 1rem;
    }

    .card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 20px;
    }

    .chart-title {
        font-size: 18px;
        font-weight: bold;
        color: #2d5a4c;
        margin: 15px 0;
    }

    .chart-container {
        flex-grow: 1;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .select-styled {
        appearance: none;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 30px;
        padding: 8px 35px 8px 15px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        transition: all 0.2s;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 16px;
    }

    .select-styled:hover,
    .select-styled:focus {
        border-color: #4caf50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
        outline: none;
    }

    @media (max-width: 750px) {
        .outer-container {
            padding: 0 10px;
        }

        .card {
            height: 280px;
        }

        .header {
            padding: 10px 15px;
        }

        .chart-title {
            font-size: 16px;
            margin: 5px 0;
        }

        .select-styled {
            font-size: 13px;
            padding: 6px 30px 6px 10px;
        }
    }

    @media (max-width: 480px) {
        .card {
            height: 250px;
        }

        .header {
            flex-direction: column;
            align-items: flex-start;
        }

        .dropdown {
            width: 100%;
            margin-top: 5px;
        }

        .select-styled {
            width: 100%;
            font-size: 12px;
        }
    }
</style>
