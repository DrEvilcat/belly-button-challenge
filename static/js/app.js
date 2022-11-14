let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Initialise mode
let init = true;
let jsonResult;
d3.json(url).then(function(result){
    jsonResult = result;
    //Initialise Dropdown
    let dropdown = d3.select("#selDataset");
    if(init) {
        console.log(dropdown);
        let dropdownText = ""
        for(let i = 0; i < result.names.length; i++){
            dropdownText +=  '<option value="' + result.names[i] + '">' + result.names[i] + '</option>';
        }
        console.log(dropdownText);
        dropdown.html(dropdownText);
    }


    //Bar Chart
    console.log(result);
    let thisId = 940;
    let thisPerson = result.samples[0];
    console.log(thisPerson);
    let x_sort = thisPerson.sample_values.sort(d3.descending).slice(0,10);
    console.log(x_sort);
    let ids_sort = thisPerson.otu_ids.sort(function(a,b){
        return thisPerson.sample_values.indexOf(a) - thisPerson.sample_values.indexOf(b)
    }).slice(0,10);
    let labs_sort = thisPerson.otu_labels.sort(function(a,b){
        return thisPerson.sample_values.indexOf(a) - thisPerson.sample_values.indexOf(b)
    }).slice(0,10);

    //Fixing labels
    for(let i = 0; i < ids_sort.length; i++) {
        ids_sort[i] = "OTU " + ids_sort[i];
    }

    data = [{
        x: x_sort,
        y: ids_sort,
        text: labs_sort,
        type: 'bar',
        orientation: 'h'
    }];
    let layout = {yaxis: {
        autorange: 'reversed'
    }};
    Plotly.newPlot('bar',data, layout);

    //Bubble Chart
    data = [{
        x: thisPerson.otu_ids,
        y: thisPerson.sample_values,
        mode: 'markers',
        text: thisPerson.otu_labels,
        marker: {
            size: thisPerson.sample_values,
            color: thisPerson.otu_ids
        }
    }]
    layout = {
        xaxis: {title: "OTU ID"}
    }
    Plotly.newPlot('bubble',data, layout);

    //Demographic Info
    let infoCell = d3.select("#sample-metadata");
    let metadata = result.metadata[940-thisId]
    let text = ""
    for(var key in metadata) {
        console.log(key);
        text += key + ": " + metadata[key] + "<br>";
    }
    infoCell.html(text);
    init = false;

});

//Attach Listener
//d3.select("#selDataset").on("change", updatePlotly);

function optionChanged(id){
    jsonResult = jsonResult;
    //Initialise Dropdown
    //let dropdown = d3.select("#selDataset");
    //let id = dropdown.property("value");

    //Bar Chart
    console.log(jsonResult);
    let thisId = jsonResult.names.indexOf(id);
    let thisPerson = jsonResult.samples[thisId];
    console.log(thisPerson);
    let x_sort = thisPerson.sample_values.sort(d3.descending).slice(0,10);
    console.log(x_sort);
    let ids_sort = thisPerson.otu_ids.sort(function(a,b){
        return thisPerson.sample_values.indexOf(a) - thisPerson.sample_values.indexOf(b)
    }).slice(0,10);
    let labs_sort = thisPerson.otu_labels.sort(function(a,b){
        return thisPerson.sample_values.indexOf(a) - thisPerson.sample_values.indexOf(b)
    }).slice(0,10);

    //Fixing labels
    for(let i = 0; i < ids_sort.length; i++) {
        ids_sort[i] = "OTU " + ids_sort[i];
    }

    data = [{
        x: x_sort,
        y: ids_sort,
        text: labs_sort,
        type: 'bar',
        orientation: 'h'
    }];
    let layout = {yaxis: {
        autorange: 'reversed'
    }};
    Plotly.newPlot('bar',data, layout);

    //Bubble Chart
    data = [{
        x: thisPerson.otu_ids,
        y: thisPerson.sample_values,
        mode: 'markers',
        text: thisPerson.otu_labels,
        marker: {
            size: thisPerson.sample_values,
            color: thisPerson.otu_ids
        }
    }]
    layout = {
        xaxis: {title: "OTU ID"}
    }
    Plotly.newPlot('bubble',data, layout);

    //Demographic Info
    let infoCell = d3.select("#sample-metadata");
    let metadata = jsonResult.metadata[thisId];
    let text = ""
    for(var key in metadata) {
        console.log(key);
        text += key + ": " + metadata[key] + "<br>";
    }
    infoCell.html(text);
    init = false;
 
}
