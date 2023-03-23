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

// Create default data to be shown on the webpage before any Test Subject ID is chosen.
d3.json(url).then(function(data) {

    let sample = data.samples

    let sampleValuesList = [];
    let otuIdsList = [];
    let otuLabelsList = [];

    // Loop through the first 10 sample_values, otu_ids, and otu_labels of the first sample (where id == '940') in the samples array,
    // then add them to their respective lists.
    for (let i = 0; i < 10; i++) {
                
        sampleValuesList.push(sample[0].sample_values[i]);
        otuIdsList.push(sample[0].otu_ids[i].toString());
        otuLabelsList.push(sample[0].otu_labels[i]);

    };

    // Log our results into the console.
    console.log(sampleValuesList);
    console.log(otuIdsList);
    console.log(otuLabelsList);

    // Using the data from the three lists above, create a horizontal bar graph.
    let dataSet = [{
        x: sampleValuesList.reverse(),
        y: otuIdsList.map(x => `OTU ${x}`).reverse(),
        text: otuLabelsList.reverse(),
        type: 'bar',
        orientation: 'h'
    }];
    
    let layout = {
        height: 600,
        width: 600
    };
    
    Plotly.newPlot('bar', dataSet, layout);

    // Demographic Info section.
    let meta = data.metadata;

    let defaultInfo = [];

    // Loop through the information of the first individual in the metadata array and store it in the defaultInfo list.
    for (let [key, value] of Object.entries(meta[0])) {
        defaultInfo.push(`${key}: ${value}`);
    };

    // Log our results into the console.
    console.log(defaultInfo);
        
    // Add the defaultInfo information to the webpage under the Demographic Info header as an unordered list.
    let demInfo = document.querySelector('#sample-metadata');

    let nodes = defaultInfo.map(function(row) {
        let ul = document.createElement('ul');
        ul.textContent = row;
        return ul;
    });

    demInfo.append(...nodes);

});

