// Save url of the data to be read in.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and log it in the console to look over.
d3.json(url).then(function(data) {
    console.log(data);
});

// Insert every Test Subject ID into the dropdown menu. When one is clicked, info for that Test Subject will be shown.
d3.json(url).then(function(data) {

    let dropdownMenu = d3.select('#selDataset');

    let testSubject = data.names;

    // Loop through every Test Subject and add their ID to the dropdown menu.
    for (let i = 0; i < testSubject.length; i++) {
        
        let id = testSubject[i]

        dropdownMenu
        .append('option')
        .text(id)
        .property('value', id);

    };

});

//function defaultId(testSubject) {
    //return testSubject.id == '940';
  //}

d3.json(url).then(function(data) {

    let sample = data.samples

    let sampleValuesList = [];
    let otuIdsList = [];
    let otuLabelsList = [];

    for (let i = 0; i < 10; i++) {
                
        sampleValuesList.push(sample[0].sample_values[i]);

        otuIdsList.push(sample[0].otu_ids[i].toString());

        otuLabelsList.push(sample[0].otu_labels[i]);

    };

    console.log(sampleValuesList);

    console.log(otuIdsList);

    console.log(otuLabelsList);

    let dataSet = [{
        x: sampleValuesList.reverse(),
        y: otuIdsList.map(x => `OTU ${x}`).reverse(),
        text: otuLabelsList.reverse(),
        type: 'bar',
        orientation: 'h'
    }];
    
    let layout = {
        height: 600,
        width: 800
    };
    
    Plotly.newPlot('bar', dataSet, layout);

});

