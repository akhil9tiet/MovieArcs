
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DetailedDataPoint, Margin, MovieKey } from '../types';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { movieColors, movies, getMovieData } from '../data';

interface MultiLineChartProps {
  activeMovie: MovieKey;
  theme?: 'dark' | 'light';
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({ activeMovie, theme = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(containerRef);

  useEffect(() => {
    if (!dimensions || !svgRef.current) return;

    const isLight = theme === 'light';
    const axisTextColor = isLight ? "#475569" : "#94a3b8"; // Slate-600 vs Slate-400
    const gridColor = isLight ? "#cbd5e1" : "#475569"; // Slate-300 vs Slate-600
    const zeroLineColor = isLight ? "#94a3b8" : "#64748b"; // Slate-400 vs Slate-500

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    // Matching LineChart aesthetic, slightly less left margin as no pills
    const margin: Margin = { top: 40, right: 30, bottom: 80, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleLinear().domain([1, 24]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([-10, 10]).range([innerHeight, 0]);

    const lineGenerator = d3.line<DetailedDataPoint>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // --- Defs (Glow Filters) ---
    const defs = svg.append("defs");
    
    // Create glow filters for each movie color
    movies.forEach(movie => {
        const color = movieColors[movie];
        const id = `glow-${movie.replace(/\s+/g, '-')}`;
        const filter = defs.append("filter").attr("id", id);
        
        filter.append("feGaussianBlur")
            .attr("stdDeviation", "3")
            .attr("result", "coloredBlur");
            
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    });

    // --- Grid Lines (Matching LineChart.tsx) ---
    
    // 1. Vertical Grid Lines (Act Breaks at 6, 12, 18)
    const xAxisGrid = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickFormat(() => "")
      .tickValues([6, 12, 18]);

    const gridGroup = g.append("g")
      .attr("class", "grid-lines")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxisGrid);
    
    gridGroup.selectAll("line")
      .attr("stroke", gridColor)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4")
      .attr("opacity", 0.3);

    gridGroup.select(".domain").remove();

    // 2. Horizontal Grid Lines (-10, -5, 5, 10)
    const yAxisGrid = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(() => "")
      .tickValues([-10, -5, 5, 10]);

    const yGridGroup = g.append("g")
      .attr("class", "grid-lines-y")
      .call(yAxisGrid);

    yGridGroup.selectAll("line")
      .attr("stroke", isLight ? "#cbd5e1" : "#94a3b8")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.3);

    yGridGroup.select(".domain").remove();

    // 3. Zero Line (Neutral Axis)
    g.append("line")
      .attr("x1", 0).attr("x2", innerWidth)
      .attr("y1", yScale(0)).attr("y2", yScale(0))
      .attr("stroke", zeroLineColor)
      .attr("stroke-width", 2)
      .style("opacity", 0.8);

    // --- Axes ---
    const xAxis = d3.axisBottom(xScale)
        .ticks(24)
        .tickValues([1, 6, 12, 18, 24])
        .tickFormat(d => `${d}`)
        .tickPadding(15);
    
    const xAxisGroup = g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);
    
    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("text")
        .attr("fill", axisTextColor)
        .attr("font-size", "12px")
        .attr("font-weight", 500);

    const yAxis = d3.axisLeft(yScale)
        .tickValues([-10, -5, 0, 5, 10])
        .tickPadding(10);
        
    const yAxisGroup = g.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("text")
        .attr("fill", axisTextColor)
        .attr("font-size", "12px");

    // --- Structure Labels ---
    const structureLabelsData = [
      { x: 6, label: "ACT II ⟶" },
      { x: 12, label: "ACT III ⟶" }
    ];

    g.append("g")
      .attr("transform", `translate(0, ${innerHeight + 50})`)
      .selectAll("text")
      .data(structureLabelsData)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.x))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", axisTextColor)
      .attr("font-size", "10px")
      .attr("font-weight", "500")
      .text(d => d.label);

    // --- Lines ---
    
    // Draw inactive lines first (faded)
    movies.forEach(movie => {
        if (movie === activeMovie) return; // Skip active for now
        
        const data = getMovieData(movie);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", movieColors[movie])
            .attr("stroke-width", 1.5)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("opacity", isLight ? 0.3 : 0.2) // Dim inactive
            .attr("d", lineGenerator)
            .style("transition", "opacity 0.5s ease");
    });

    // Draw active line on top
    const activeData = getMovieData(activeMovie);
    const glowId = `glow-${activeMovie.replace(/\s+/g, '-')}`;
    
    const path = g.append("path")
        .datum(activeData)
        .attr("fill", "none")
        .attr("stroke", movieColors[activeMovie])
        .attr("stroke-width", 4)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("d", lineGenerator)
        .style("filter", `url(#${glowId})`) // Apply Glow
        .attr("opacity", 0);
        
    path.transition()
        .duration(500)
        .attr("opacity", 1);
        
  }, [dimensions, activeMovie, theme]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full overflow-visible" />
    </div>
  );
};

export default MultiLineChart;
