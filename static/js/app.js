// Save url of the data to be read in.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and log it in the console to look over.
d3.json(url).then(function(data) {
    
    console.log(data);

});

// Insert every Test Subject ID into the dropdown menu. When one is clicked, info for that Test Subject will be shown.
d3.json(url).then(function(data) {

    // Use D3 to select the dropdown menu.
    let dropdownMenu = d3.select('#selDataset');

    // Create a variable to represent the 'names' array of our dataset.
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

    // Create a variable to represent the 'samples' array of our dataset.
    let sample = data.samples

    // Bar Graph section.
    let barSampleValuesList = [];
    let barOtuIdsList = [];
    let barOtuLabelsList = [];

    // Loop through the first 10 sample_values, otu_ids, and otu_labels of the first sample (where id == '940') in the 'samples' array,
    // then add them to their respective lists.
    for (let i = 0; i < 10; i++) {
                
        barSampleValuesList.push(sample[0].sample_values[i]);
        barOtuIdsList.push(sample[0].otu_ids[i]);
        barOtuLabelsList.push(sample[0].otu_labels[i]);

    };

    // Log the results into the console.
    console.log(barSampleValuesList);
    console.log(barOtuIdsList);
    console.log(barOtuLabelsList);

    // Create a horizontal bar graph.
    let barData = [{
        x: barSampleValuesList.reverse(),
        y: barOtuIdsList.map(x => `OTU ${x}`).reverse(),
        text: barOtuLabelsList.reverse(),
        type: 'bar',
        orientation: 'h'
    }];
    
    let barLayout = {
        title: `The Top 10 OTUs in Test Subject ${sample[0].id}'s Belly Button`,
        xaxis: {
            title: 'Sample Value'
        },
        height: 600,
        width: 900
    };
    
    Plotly.newPlot('bar', barData, barLayout);

    // Bubble Chart section.
    let bubbleSampleValuesList = [];
    let bubbleOtuIdsList = [];
    let bubbleOtuLabelsList = [];

    // Loop through all sample_values, otu_ids, and otu_labels of the first sample (where id == '940') in the 'samples' array,
    // then add them to their respective lists.
    for (let i = 0; i < sample[0].otu_ids.length; i++) {
                
        bubbleSampleValuesList.push(sample[0].sample_values[i]);
        bubbleOtuIdsList.push(sample[0].otu_ids[i]);
        bubbleOtuLabelsList.push(sample[0].otu_labels[i]);

    };

    // Log the results into the console.
    console.log(bubbleSampleValuesList);
    console.log(bubbleOtuIdsList);
    console.log(bubbleOtuLabelsList);

    // Create a bubble chart.
    var bubbleData = [{
        x: bubbleOtuIdsList,
        y: bubbleSampleValuesList,
        text: bubbleOtuLabelsList,
        mode: 'markers',
        marker: {
            size: bubbleSampleValuesList,
            color: bubbleOtuIdsList,
            colorscale: 'Electric'
        }
    }];
      
    var bubbleLayout = {
        title: `OTU by Sample Value for Test Subject ${sample[0].id}`,
        xaxis: {
            title: 'OTU ID'
        },
        yaxis: {
            title: 'Sample Value'
        },
        showlegend: false,
        height: 600,
        width: 1200
    };
 
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // Demographic Info section.
    let meta = data.metadata;

    let defaultInfo = [];

    // Loop through the information of the first individual in the 'metadata' array and store it in the defaultInfo list.
    for (let [key, value] of Object.entries(meta[0])) {
        
        defaultInfo.push(`${key}: ${value}`);

    };

    // Log the results into the console.
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

// On change to the DOM, call optionChanged().
d3.selectAll('#selDataset').on('change', optionChanged);

// Function called by DOM changes.
function optionChanged() {

    d3.json(url).then(function(data) {

        // Use D3 to select the dropdown menu.
        let dropdownMenu = d3.select('#selDataset');

        // Assign the value of the dropdown menu option to a variable.
        let id = dropdownMenu.property('value');

        // Create a variable to represent the Test Subject ID that was chosen by the user and filter our data results to that specific ID.
        let sample = data.samples.filter(x => x.id.toString() == id)[0];


        // Bar Graph section.
        let barSampleValuesList = [];
        let barOtuIdsList = [];
        let barOtuLabelsList = [];

        // Loop through the first 10 sample_values, otu_ids, and otu_labels of the chosen sample in the 'samples' array,
        // then add them to their respective lists.
        for (let i = 0; i < 10; i++) {
                
            barSampleValuesList.push(sample.sample_values[i]);
            barOtuIdsList.push(sample.otu_ids[i]);
            barOtuLabelsList.push(sample.otu_labels[i]);

        };

        // Log the results into the console.
        console.log(barSampleValuesList);
        console.log(barOtuIdsList);
        console.log(barOtuLabelsList);
    
        // Update the bar chart's data to represent the info of the Test Subject chosen by the user.
        Plotly.restyle('bar', 'x', [barSampleValuesList.reverse()]);
        Plotly.restyle('bar', 'y', [barOtuIdsList.map(x => `OTU ${x}`).reverse()]);
        Plotly.restyle('bar', 'text', [barOtuLabelsList.reverse()]);
        Plotly.relayout('bar', 'title', `The Top 10 OTUs in Test Subject ${sample.id}'s Belly Button`);

        // Bubble Chart section.
        let bubbleSampleValuesList = [];
        let bubbleOtuIdsList = [];
        let bubbleOtuLabelsList = [];

        // Loop through all sample_values, otu_ids, and otu_labels of the chosen sample in the 'samples' array,
        // then add them to their respective lists.
        for (let i = 0; i < sample.otu_ids.length; i++) {
        
            bubbleSampleValuesList.push(sample.sample_values[i]);
            bubbleOtuIdsList.push(sample.otu_ids[i]);
            bubbleOtuLabelsList.push(sample.otu_labels[i]);

        };

        // Log the results into the console.
        console.log(bubbleSampleValuesList);
        console.log(bubbleOtuIdsList);
        console.log(bubbleOtuLabelsList);

        // Update the bubble chart's data to represent the info of the Test Subject chosen by the user.
        Plotly.restyle('bubble', 'x', [bubbleOtuIdsList]);
        Plotly.restyle('bubble', 'y', [bubbleSampleValuesList]);
        Plotly.restyle('bubble', 'text', [bubbleOtuLabelsList]);
        Plotly.relayout('bubble', 'title', `OTU by Sample Value for Test Subject ${sample.id}`);

        // Demographic Info section.
        let meta = data.metadata.filter(x => x.id.toString() == id)[0];

        let testSubjectInfo = [];

        // Loop through the information of the chosen individual in the 'metadata' array and store it in the testSubjectInfo list.
        for (let [key, value] of Object.entries(meta)) {

            testSubjectInfo.push(`${key}: ${value}`);

        };

        // Log the results into the console.
        console.log(testSubjectInfo);
        
        // Add the chosen individual's information to the webpage under the Demographic Info header as an unordered list.
        let demInfo = document.querySelector('#sample-metadata');

        // First, the information from #sample-metadata of the default individual must be erased.
        demInfo.innerHTML = '';

        // Then, we continue with adding the chosen individual's information.
        let nodes = testSubjectInfo.map(function(row) {

            let ul = document.createElement('ul');
            ul.textContent = row;
            return ul;

        });        

        demInfo.append(...nodes);

    });

};