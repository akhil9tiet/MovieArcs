
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { movies, getMovieData, storyArcData, movieMetadata, movieColors } from '../data';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { DataPoint } from '../types';

const calculateRMS = (movieData: DataPoint[], standardData: DataPoint[]) => {
  let sumSq = 0;
  const len = Math.min(movieData.length, standardData.length);
  for (let i = 0; i < len; i++) {
    const diff = movieData[i].value - standardData[i].value;
    sumSq += diff * diff;
  }
  return Math.sqrt(sumSq / len);
};

const CorrelationChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(containerRef);

  useEffect(() => {
    if (!dimensions || !svgRef.current) return;

    const data = movies.map(movie => {
      const moviePoints = getMovieData(movie);
      const rms = calculateRMS(moviePoints, storyArcData);
      const revenue = movieMetadata[movie].boxOffice;
      return { movie, rms, revenue, color: movieColors[movie] };
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 40, right: 60, bottom: 80, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, (d3.max(data, d => d.rms) || 10) * 1.1])
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain([0, (d3.max(data, d => d.revenue) || 1000000000) * 1.1])
      .range([innerHeight, 0])
      .nice();

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSize(-innerHeight).tickFormat(() => ""))
      .attr("stroke-opacity", 0.05);

    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).ticks(6).tickSize(-innerWidth).tickFormat(() => ""))
      .attr("stroke-opacity", 0.05);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(5).tickPadding(15);
    const yAxis = d3.axisLeft(yScale).ticks(6).tickFormat(d => {
        const val = +d;
        if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
        if (val >= 1000000) return `$${(val / 1000000).toFixed(0)}M`;
        return `$${val}`;
    }).tickPadding(15);

    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "#94a3b8")
      .attr("font-size", "10px")
      .attr("font-weight", "600");

    g.append("g")
      .call(yAxis)
      .selectAll("text")
      .attr("fill", "#94a3b8")
      .attr("font-size", "10px")
      .attr("font-weight", "600");

    g.selectAll(".domain").remove();
    g.selectAll(".tick line").attr("stroke", "#e2e8f0");

    // Labels
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 60)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("letter-spacing", "0.1em")
      .text("ARC DEVIATION (RMSD)");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -75)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("letter-spacing", "0.1em")
      .text("REVENUE (USD)");

    // Tooltip
    const tooltip = d3.select(containerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(15, 23, 42, 0.95)")
      .style("color", "white")
      .style("padding", "10px 14px")
      .style("border-radius", "12px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "100")
      .style("box-shadow", "0 10px 20px -5px rgba(0, 0, 0, 0.3)");

    // Trend Line
    // Manual calculation of linear regression since d3.regressionLinear is not available in core d3 types
    const n = data.length;
    const sumX = d3.sum(data, d => d.rms);
    const sumY = d3.sum(data, d => d.revenue);
    const sumXY = d3.sum(data, d => d.rms * d.revenue);
    const sumXX = d3.sum(data, d => d.rms * d.rms);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const xExtent = d3.extent(data, d => d.rms) as [number, number];
    const p1 = [xExtent[0], slope * xExtent[0] + intercept];
    const p2 = [xExtent[1], slope * xExtent[1] + intercept];

    g.append("line")
        .attr("x1", xScale(p1[0]))
        .attr("y1", yScale(p1[1]))
        .attr("x2", xScale(p2[0]))
        .attr("y2", yScale(p2[1]))
        .attr("stroke", "#6366f1")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("opacity", 0.4);

    // Points
    const points = g.selectAll(".dot")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "dot-group")
      .style("cursor", "pointer");

    points.append("circle")
      .attr("cx", d => xScale(d.rms))
      .attr("cy", d => yScale(d.revenue))
      .attr("r", 0)
      .attr("fill", d => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).transition().duration(200).attr("r", 14);
        tooltip.style("visibility", "visible")
          .html(`
            <div class="font-black text-xs uppercase opacity-60 mb-1">Movie Analysis</div>
            <div class="font-bold text-sm mb-2">${d.movie}</div>
            <div class="flex justify-between gap-4">
              <span class="opacity-70">RMSD:</span>
              <span class="font-mono text-indigo-400">${d.rms.toFixed(2)}</span>
            </div>
            <div class="flex justify-between gap-4">
              <span class="opacity-70">Revenue:</span>
              <span class="font-mono text-emerald-400">$${(d.revenue / 1000000).toFixed(0)}M</span>
            </div>
          `);
      })
      .on("mousemove", (event) => {
        const rect = containerRef.current!.getBoundingClientRect();
        tooltip.style("top", (event.clientY - rect.top - 80) + "px")
               .style("left", (event.clientX - rect.left + 20) + "px");
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget).transition().duration(200).attr("r", 10);
        tooltip.style("visibility", "hidden");
      })
      .transition()
      .delay((d, i) => i * 100)
      .duration(1000)
      .attr("r", 10);

    // Text Labels
    points.append("text")
      .attr("x", d => xScale(d.rms) + 14)
      .attr("y", d => yScale(d.revenue) + 4)
      .text(d => d.movie)
      .attr("fill", "#64748b")
      .attr("font-size", "9px")
      .attr("font-weight", "600")
      .attr("opacity", 0)
      .transition()
      .delay((d, i) => i * 100 + 500)
      .duration(1000)
      .attr("opacity", 0.7);

  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full overflow-visible" />
    </div>
  );
};

export default CorrelationChart;
