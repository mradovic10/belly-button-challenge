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

    for (let i = 0; i < testSubject.length; i++) {
        
        let id = testSubject[i]

        dropdownMenu
        .append('option')
        .text(id)
        .property('value', id);
    };
});