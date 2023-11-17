function _1(md){return(
md`# HW1 Strong baseline `
)}

function _workbook(FileAttachment){return(
FileAttachment("data.xlsx").xlsx()
)}

function _3(workbook){return(
workbook.sheetNames
)}

function _data(workbook){return(
workbook.sheet(0, {
    headers: false,
    // range: "A1:J10"
  })
)}

function _transformedData(data){return(
data.map(d => ({
  class: d.A, // The category, e.g., '電資AI碩一'
  id: d.B,       // The unique identifier, e.g., '112C52983'
  name: d.C,     // The name, e.g., '鮳恺逛'
  github: d.D,   // The GitHub handle, e.g., 'aheqtggakx'
  HW_1: d.E,   // Score E, e.g., 3
  HW_2: d.F,
  HW_3: d.G,
  HW_4: d.H,
  HW_5: d.I,
  HW_6: d.J,
  HW_7: d.K,
  HW_8: d.L,
  HW_9: d.M,
  HW_10: d.N,
  // Add additional mappings for other scores if necessary
}))
)}

function _flatData(transformedData){return(
transformedData.flatMap(d =>
  Array.from({ length: 10 }, (_, i) => ({
    class: d.class,
    score: `HW_${i + 1}`,
    value: d[`HW_${i + 1}`]
  }))
)
)}

function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _8(Plot,plot2,flatData){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  x: {
    label: "Class →", // X-axis label
    // This will rotate the class labels to avoid overlap
    tickRotate: -90
  },
  y: {
    label: "Count →", // Y-axis label
    grid: true
  },
  color: {
    legend: true // Show legend for colors
  },
  facet: {
    data: flatData,
    y: "score"
  },
  marks: [
    Plot.barY(flatData, {
      x: "class",
      y: "value",
      fill: "score",
      title: d => `${d.score}: ${d.value}`
    })
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.xlsx", {url: new URL("../data.xlsx", import.meta.url), mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("workbook")).define("workbook", ["FileAttachment"], _workbook);
  main.variable(observer()).define(["workbook"], _3);
  main.variable(observer("data")).define("data", ["workbook"], _data);
  main.variable(observer("transformedData")).define("transformedData", ["data"], _transformedData);
  main.variable(observer("flatData")).define("flatData", ["transformedData"], _flatData);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","flatData"], _8);
  return main;
}
