# belly-button-challenge
Module 14 Challenge

The mission of this challenge was to build an interactive dashboard to explore the biodiversity found in our belly buttons. The data was collected by the NC State Public Science Lab (http://robdunnlab.com/projects/belly-button-biodiversity/) and accessed by using the D3 Library to read in their JSON file. A copy of that data is included in the repository for quick reference.

In addition to the JSON file, the repository includes an index.html file and a 'static' folder that contains the JavaScript file, titled 'app'. The JavaScript file is thoroughly commented with relevant notes that explain the code and its functionality.

The finished web application has a dropdown menu where you can choose the sample data by Test Subject ID number. After an ID is chosen, then the Demographic Info, Bar Graph, and Bubble Chart will all update with the relevant info for that specific Test Subject. When you hover over information on the two graphs, you will be able to see the exact number of the Sample Value and the scientific labels of each OTU (operational taxonomic unit).

MR

--

Help with Object.entries(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

Help with .append(...nodes): https://www.javascripttutorial.net/javascript-dom/javascript-append/