window.addEventListener("load", () => {
  let url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let keys = Object.keys(data);
      dataset = data.data;
      console.log(dataset);
      const w = 1500;
      const h = 700;
      const padding = 100;

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h - padding, padding]);

      const xScale = d3
        .scaleLinear()
        .domain([0, dataset.length])
        .range([padding, w - padding]);

      const svg = d3
        .select(".container")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("x", (d, i) => {
          return xScale(i);
        })
        .attr("y", (d, i) => yScale(d[1]))
        .attr("width", 4)
        .attr("height", (d, i) => h - yScale(d[1]) - padding + "px")
        .attr("fill", "navy")
        .attr("class", "bar")
        .append("title")
        .attr("id", "tooltip")
        .attr("data-date", (d) => d[0])
        .text((d) => {
          return d[0].split("-")[1] < 4
            ? "Q1" +
                " " +
                d[0].split("-")[0] +
                "\n$" +
                d[1] +
                " Billion  month " +
                d[0].split("-")[1]
            : (d[0].split("-")[1] >= 4) & (d[0].split("-")[1] < 7)
            ? "Q2" +
              " " +
              d[0].split("-")[0] +
              "\n$" +
              d[1] +
              " Billion  month " +
              d[0].split("-")[1]
            : (d[0].split("-")[1] >= 7) & (d[0].split("-")[1] < 10)
            ? "Q3" +
              " " +
              d[0].split("-")[0] +
              "\n$" +
              d[1] +
              " Billion  month " +
              d[0].split("-")[1]
            : "Q4" +
              " " +
              d[0].split("-")[0] +
              "\n$" +
              d[1] +
              " Billion  month " +
              d[0].split("-")[1];
        });

      const xAxisScale = d3
        .scaleTime()
        .domain([new Date(1947, 0), new Date(2015, 3)])
        .range([padding, w - padding]);

      svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + (h - padding) + ")")
        .attr("id", "x-axis")
        .attr("class", "tick")
        .call(d3.axisBottom(xAxisScale));

      svg
        .append("g")
        .attr("transform", "translate(" + padding + ", " + 0 + ")")
        .attr("id", "y-axis")
        .attr("class", "tick")
        .call(d3.axisLeft(yScale));

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 3 * padding - h)
        .attr("y", padding + 20)
        .text("Gross Domestic Product in Billions");

      svg
        .append("text")
        .attr("x", w / 2 - 2 * padding)
        .attr("y", padding)
        .text("US GDP 1947-2015")
        .attr("class", "Title")
        .attr("id", "title");

      svg
        .append("a")
        .attr("href", url)
        .append("text")
        .text("Source")
        .attr("x", w - 80)
        .attr("y", h - 30)
        .style("color", "blue");
    });
});
