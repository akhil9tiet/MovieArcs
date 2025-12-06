
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataPoint, Margin } from '../types';
import { useResizeObserver } from '../hooks/useResizeObserver';

interface LineChartProps {
  data: DataPoint[];
  baselineData?: DataPoint[];
  lineColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  disableAnimation?: boolean;
  theme?: 'dark' | 'light';
}

const emotionMap: Record<number, string> = {
  10: "Elation",
  9: "Celebration",
  8: "Triumph",
  7: "Happiness",
  6: "Achievement",
  5: "Joy",
  4: "Victory",
  3: "Confidence",
  2: "Hope",
  1: "Relief",
  0: "Neutral",
  "-1": "Hesitation",
  "-2": "Unease",
  "-3": "Conflict",
  "-4": "Frustration",
  "-5": "Tension",
  "-6": "Sadness",
  "-7": "Anxiety",
  "-8": "Betrayal",
  "-9": "Devastation",
  "-10": "Despair"
};

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  baselineData,
  lineColor = "#6366f1", // Indigo 500
  gradientStart = "rgba(99, 102, 241, 0.5)", 
  gradientEnd = "rgba(99, 102, 241, 0)",
  disableAnimation = false,
  theme = 'dark'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(containerRef);

  useEffect(() => {
    if (!dimensions || !data || data.length === 0 || !svgRef.current) return;

    // --- Theme Constants ---
    const isLight = theme === 'light';
    const axisTextColor = isLight ? "#475569" : "#94a3b8"; // Slate-600 vs Slate-400
    const gridColor = isLight ? "#cbd5e1" : "#475569"; // Slate-300 vs Slate-600
    const zeroLineColor = isLight ? "#94a3b8" : "#64748b"; // Slate-400 vs Slate-500
    const pillTextColor = isLight ? "#334155" : "currentColor"; // Slate-700 vs Inherit
    
    // --- Animation Constants ---
    // If disableAnimation is true, we set duration to 0 and startDelay to 0
    const startDelay = disableAnimation ? 0 : 600; 
    const duration = disableAnimation ? 0 : 2000;
    const ease = d3.easeCubicOut;

    // --- Setup ---
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    // Increased left margin to fit the pill labels (140px)
    // Increased bottom margin to fit Act labels (80px)
    const margin: Margin = { top: 40, right: 30, bottom: 80, left: 140 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // --- Scales ---
    // X Axis: 1 to 24
    const xScale = d3.scaleLinear()
      .domain([1, 24]) 
      .range([0, innerWidth]);

    // Y Axis: -10 to 10 (Guaranteed range)
    const yScale = d3.scaleLinear()
      .domain([-10, 10]) 
      .range([innerHeight, 0]);

    // --- Generators ---
    const lineGenerator = d3.line<DataPoint>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3.area<DataPoint>()
      .x(d => xScale(d.x))
      .y0(innerHeight) // Fill to bottom
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // --- SVG Structure ---
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // --- Defs (Gradients, Filters, Clips) ---
    const defs = svg.append("defs");

    // 1. Area Gradient
    const gradientId = "area-gradient";
    const areaGradient = defs.append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    areaGradient.append("stop").attr("offset", "0%").attr("stop-color", gradientStart);
    areaGradient.append("stop").attr("offset", "100%").attr("stop-color", gradientEnd);

    // 2. Line Gradient
    const lineGradientId = "line-gradient";
    const lineGradient = defs.append("linearGradient")
      .attr("id", lineGradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
      
    lineGradient.append("stop").attr("offset", "0%").attr("stop-color", isLight ? "#818cf8" : "#a5b4fc"); // Adjust for light mode
    lineGradient.append("stop").attr("offset", "100%").attr("stop-color", lineColor); 

    // 3. Drop Shadow Filter (High quality)
    const filterId = "drop-shadow";
    const filter = defs.append("filter")
        .attr("id", filterId)
        .attr("height", "150%"); // allow shadow to spill out

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 4)
        .attr("result", "blur");
    
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 4)
        .attr("result", "offsetBlur");
        
    filter.append("feFlood")
        .attr("flood-color", lineColor)
        .attr("flood-opacity", 0.4)
        .attr("result", "offsetColor");
        
    filter.append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // 4. Clip Path for Area
    const clipId = "chart-area-clip";
    const clipRect = defs.append("clipPath")
      .attr("id", clipId)
      .append("rect")
      .attr("width", 0)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", -margin.top);

    // --- Vertical Grid Lines (Act Breaks at 6, 12, 18) ---
    const xAxisGrid = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickFormat(() => "")
      .tickValues([6, 12, 18]); // Explicit points

    const gridGroup = g.append("g")
      .attr("class", "grid-lines")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxisGrid);
    
    gridGroup.selectAll("line")
      .attr("stroke", gridColor) 
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4") // Dashed
      .attr("opacity", disableAnimation ? 0.3 : 0); // Initial opacity

    gridGroup.select(".domain").remove();

    // Specific Reference Lines at -10, -5, 5, 10 (excluding 0)
    const yAxisGrid = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(() => "")
      .tickValues([-10, -5, 5, 10]); 
      
    const yGridGroup = g.append("g")
      .attr("class", "grid-lines-y")
      .call(yAxisGrid);

    yGridGroup.selectAll("line")
      .attr("stroke", isLight ? "#cbd5e1" : "#94a3b8") // Light mode uses lighter gray
      .attr("stroke-width", 0.5) 
      .attr("opacity", disableAnimation ? 0.4 : 0);

    yGridGroup.select(".domain").remove();

    // --- Neutral Axis Line (Zero Line) ---
    const zeroLine = g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", yScale(0))
      .attr("y2", yScale(0))
      .attr("stroke", zeroLineColor) 
      .attr("stroke-width", 2)
      .style("opacity", disableAnimation ? 0.8 : 0);

    // --- Axes ---
    const xAxis = d3.axisBottom(xScale)
      .ticks(24) // Show all points
      .tickValues([1, 6, 12, 18, 24]) // Key markers
      .tickFormat(d => `${d}`)
      .tickPadding(15);

    const xAxisGroup = g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`) // Labels stay at bottom
      .call(xAxis);

    // Remove the default bottom axis line
    xAxisGroup.select(".domain").remove();

    xAxisGroup.selectAll("text")
      .attr("fill", axisTextColor)
      .attr("font-size", "12px")
      .attr("font-weight", 500)
      .style("opacity", disableAnimation ? 1 : 0)
      .attr("transform", disableAnimation ? "translate(0,0)" : "translate(0, 10)");

    // --- Structure Labels (Act II / Act III) ---
    const structureLabelsData = [
      { x: 6, label: "ACT II ⟶" },
      { x: 12, label: "ACT III ⟶" }
    ];

    const structureLabels = g.append("g")
      .attr("class", "structure-labels")
      .attr("transform", `translate(0, ${innerHeight + 50})`); // Position below numbers

    structureLabels.selectAll("text")
      .data(structureLabelsData)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.x))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", axisTextColor) 
      .attr("font-size", "10px") 
      .attr("font-weight", "500")
      .text(d => d.label)
      .style("opacity", disableAnimation ? 1 : 0)
      .transition()
      .delay((d, i) => startDelay + 1000 + i * 100)
      .duration(1000)
      .style("opacity", 1);


    // Custom Y-Axis Labels (Pills)
    const yLabelsGroup = g.append("g").attr("class", "y-labels");
    
    // Generate range -10 to 10
    const yRange = Array.from({length: 21}, (_, i) => i - 10);

    yRange.forEach(val => {
      const yPos = yScale(val);
      const label = emotionMap[val] || `${val}`;
      
      const group = yLabelsGroup.append("g")
        .attr("transform", `translate(-15, ${yPos})`)
        .style("opacity", disableAnimation ? 1 : 0);
      
      // Determine color
      let pillColor = isLight ? "#64748b" : "#64748b"; // Neutral
      if (val > 0) pillColor = "#10b981"; // Green
      if (val < 0) pillColor = "#f43f5e"; // Red

      // Background Pill
      const pillWidth = 110;
      const pillHeight = 16;
      
      group.append("rect")
        .attr("x", -pillWidth)
        .attr("y", -pillHeight / 2)
        .attr("width", pillWidth)
        .attr("height", pillHeight)
        .attr("rx", pillHeight / 2) // Rounded full
        .attr("fill", pillColor)
        .attr("fill-opacity", isLight ? 0.15 : 0.2); // Adjust opacity for light mode
      
      // Text
      group.append("text")
        .attr("x", -10) // Padding from right edge of pill
        .attr("y", 1) // Center vertically approx
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .attr("fill", isLight && val === 0 ? pillTextColor : pillColor) 
        .attr("font-size", "10px")
        .attr("font-weight", "600")
        .text(`${val > 0 ? '+' : ''}${val} ${label}`);
        
      // Add a tiny connecting line to the axis
      group.append("line")
        .attr("x1", 5)
        .attr("y1", 0)
        .attr("x2", 15) // Connects to axis line at x=0 relative to margin
        .attr("y2", 0)
        .attr("stroke", pillColor)
        .attr("stroke-width", 1)
        .attr("opacity", 0.3);
    });

    // --- Drawing the Chart Elements ---

    // 0. Baseline Chart (Behind everything)
    if (baselineData && baselineData.length > 0) {
        const baselinePath = g.append("path")
            .datum(baselineData)
            .attr("fill", "none")
            .attr("stroke", isLight ? "#94a3b8" : "#64748b") 
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4, 6") // Dotted line
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("d", lineGenerator)
            .style("opacity", disableAnimation ? 0.5 : 0);

        if (!disableAnimation) {
          // Simple fade in for baseline
          baselinePath.transition()
              .delay(startDelay)
              .duration(1500)
              .style("opacity", 0.5); 
        }
    }

    // 1. Area Path (Clipped rect animation)
    const areaPath = g.append("path")
      .datum(data)
      .attr("fill", `url(#${gradientId})`)
      .attr("d", areaGenerator)
      .attr("clip-path", `url(#${clipId})`)
      .style("opacity", 0.8);

    // 2. Line Path (Stroke-dashoffset animation)
    const linePath = g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", `url(#${lineGradientId})`)
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("filter", `url(#${filterId})`) // Apply drop shadow
      .attr("d", lineGenerator);

    const totalLength = linePath.node()?.getTotalLength() || 0;

    if (!disableAnimation) {
      linePath
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength);
    }

    // 3. Cursor Dot
    const cursorDot = g.append("circle")
      .attr("r", 6)
      .attr("fill", "#fff")
      .attr("stroke", lineColor)
      .attr("stroke-width", 3)
      .style("opacity", 0);

    // --- Animation Sequence ---
    
    if (!disableAnimation) {
      // Animate Area Reveal
      clipRect.transition()
        .delay(startDelay)
        .duration(duration)
        .ease(ease)
        .attr("width", innerWidth + margin.left);

      // Animate Line Drawing
      linePath.transition()
        .delay(startDelay)
        .duration(duration)
        .ease(ease)
        .attr("stroke-dashoffset", 0);

      // Animate Dot
      cursorDot.transition()
        .delay(startDelay)
        .duration(duration)
        .ease(ease)
        .tween("pathTween", function() {
          return function(t) {
              const point = linePath.node()?.getPointAtLength(t * totalLength);
              if (point) {
                  d3.select(this)
                      .attr("cx", point.x)
                      .attr("cy", point.y)
                      .style("opacity", 1);
              }
          };
        });

      // Animate Grid (Vertical Act Breaks)
      gridGroup.selectAll("line")
        .transition()
        .delay((d, i) => startDelay + i * 100)
        .duration(1000)
        .attr("opacity", 0.3); // Increased opacity slightly for visibility

      // Animate Reference Lines (-10, -5, 5, 10)
      yGridGroup.selectAll("line")
          .transition()
          .delay((d, i) => startDelay + i * 100)
          .duration(1000)
          .attr("opacity", 0.4);
      
      // Animate Zero Line
      zeroLine.transition()
          .delay(startDelay)
          .duration(1000)
          .style("opacity", 0.8);

      xAxisGroup.selectAll("text")
        .transition()
        .delay((d, i) => startDelay + 800 + i * 50)
        .duration(800)
        .style("opacity", 1)
        .attr("transform", "translate(0, 0)");

      // Animate Y Labels (Staggered)
      yLabelsGroup.selectAll("g")
        .transition()
        .delay((d, i) => startDelay + 500 + i * 30) // Stagger effect
        .duration(600)
        .style("opacity", 1);
    } else {
        // Immediate State if animations disabled
        clipRect.attr("width", innerWidth + margin.left);
        // cursorDot not shown initially or placed at end
    }

    // --- Interaction ---
    const overlay = g.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "transparent")
        .style("cursor", "crosshair");

    // Tooltip elements
    const tooltipLine = g.append("line")
        .attr("stroke", axisTextColor)
        .attr("stroke-dasharray", "4,4")
        .attr("y1", 0)
        .attr("y2", innerHeight)
        .attr("opacity", 0);
    
    const tooltipBox = g.append("g").attr("opacity", 0);
    
    // Tooltip background rect, width updated dynamically
    const tooltipRect = tooltipBox.append("rect")
        .attr("width", 150) // Initial width
        .attr("height", 60) // Adjusted height for 2 lines
        .attr("fill", isLight ? "rgba(255, 255, 255, 0.95)" : "#1e293b")
        .attr("stroke", isLight ? "#e2e8f0" : "#475569")
        .attr("rx", 6)
        .attr("ry", 6)
        .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.15))");
    
    // Story Label (Top Line)
    const tooltipStoryLabel = tooltipBox.append("text")
        .attr("x", 12)
        .attr("y", 22)
        .attr("text-anchor", "start")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("fill", isLight ? "#64748b" : "#94a3b8") 
        .style("text-transform", "uppercase")
        .text("");

    // Movie Label (Bottom Line)
    const tooltipMovieLabel = tooltipBox.append("text")
        .attr("x", 12)
        .attr("y", 42)
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .attr("fill", isLight ? "#1e293b" : "#f1f5f9")
        .text("");

    // Bisector for 'x' property (number)
    const bisect = d3.bisector<DataPoint, number>(d => d.x).left;

    overlay.on("mousemove", (event) => {
        const [xPos] = d3.pointer(event);
        const x0 = xScale.invert(xPos);
        const i = bisect(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        
        let d = d0;
        if (d1 && d0) {
           // Closest point
           d = (x0 - d0.x > d1.x - x0) ? d1 : d0;
        } else if (d1) {
           d = d1;
        }

        if (!d) return;
        
        const x = xScale(d.x);
        const y = yScale(d.value);

        // Find baseline point
        const b = baselineData ? baselineData.find(p => p.x === d.x) : null;

        cursorDot
            .interrupt()
            .style("opacity", 1)
            .attr("cx", x)
            .attr("cy", y);

        tooltipLine
            .attr("x1", x)
            .attr("x2", x)
            .attr("opacity", 1);

        // --- Content Update ---
        const storyText = b?.label || "Unknown Stage";
        const movieText = d.label || "";

        tooltipStoryLabel.text(storyText);
        tooltipMovieLabel.text(movieText);

        // Dynamic Width Calculation based on text length
        const w1 = tooltipStoryLabel.node()?.getComputedTextLength() || 0;
        const w2 = tooltipMovieLabel.node()?.getComputedTextLength() || 0;
        const maxTextWidth = Math.max(w1, w2);
        const boxWidth = maxTextWidth + 24; // 12px padding on each side

        tooltipRect.attr("width", boxWidth);

        // --- Position Update ---
        // Center tooltip box horizontally over point, but constrained by container width
        let boxX = x - boxWidth / 2;
        let boxY = y - 75; // Position well above the cursor
        
        // Bounds checking
        if (boxX < 0) boxX = 0;
        if (boxX + boxWidth > innerWidth) boxX = innerWidth - boxWidth;
        
        // If box goes off top, flip below
        if (boxY < 0) boxY = y + 20;

        tooltipBox
            .attr("transform", `translate(${boxX}, ${boxY})`)
            .attr("opacity", 1);
    });

    overlay.on("mouseleave", () => {
        tooltipLine.transition().duration(200).attr("opacity", 0);
        tooltipBox.transition().duration(200).attr("opacity", 0);
        
        // Reset dot to end
        const lastPoint = data[data.length - 1];
        cursorDot.transition().duration(500)
            .attr("cx", xScale(lastPoint.x))
            .attr("cy", yScale(lastPoint.value));
    });

  }, [data, baselineData, dimensions, lineColor, gradientStart, gradientEnd, disableAnimation, theme]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full overflow-visible" />
    </div>
  );
};

export default LineChart;
