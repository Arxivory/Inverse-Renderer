export function plotLoss(data) {
    const width = 270;
    const height = 150;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    d3.select("#loss-graph").selectAll("*").remove();

    const svg = d3.select("#loss-graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.iteration))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.loss),
            d3.max(data, d => d.loss)
        ])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const line = d3.line()
        .x(d => x(d.iteration))
        .y(d => y(d.loss));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#4fc3f7")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .text("Iteration");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .text("Loss");
}
