# Note-Taker-Express

Repository for a note taker made with express.js!

## Description

This is a note taker that can be used to write and save notes. It uses Express.js back end to save and retrieve note data from a JSON file. It has a landing page with a button to get started. When clicked it takes you to the notes page where you can create notes and see your previous notes displayed on the left hand side. When entering a new note, a save note and clear form button appear in the top right. When you save a note, those buttons disappear and your note is saved to the left hand side with other previous notes. When you click on a previous note from the left hand side, that note appears in the right hand column and a "new note" button appears in the nav bar. When you click "new note" button, you are given empty fields for a new note. There is also a delete button on the previous notes listed on the left hand side, when clicked the specific note is deleted.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Visuals](#visuals)
- [Roadmap](#roadmap)
- [Tests](#tests)
- [Questions](#questions)

## Installation

This application is deployed to render which handles the npm install and npm start.

## Usage

When on the landing page, click the "Get Started" button to get started. This will take you to the notes page. Here you can fill out a new note or check previous notes if you've visited the page before. When creating a new note, save note and clear form buttons appear in the nav bar. Clear form will clear all input fields so you can start over with your note. Save note will add your note to the left hand side with other previously created notes. If you click on a note on the left hand side, it will be displayed on the right hand side in bigger form and a "new note" button will appear in the navbar. When you click the new note button from the navbar you are presented with empty fields for a new note. Each individual note saved to the left hand side has a trash icon, when clicked that particular note is deleted.

## Visuals

![landing page](https://github.com/ColinBurner/SVG-logo-generator/assets/85810714/317ffd50-4a75-4603-9a4e-7ce4f4865fa1)

This screenshot shows the landing page with the get started button.

![notes page](https://github.com/ColinBurner/SVG-logo-generator/assets/85810714/96a1a110-4c37-479d-b91e-82dc1f53e183)

This screenshot shows the notes page you are taken to after choosing to get started. (Observe the saved notes on the left hand side with the trash icons)

![get routes in server js](https://github.com/ColinBurner/SVG-logo-generator/assets/85810714/c5d19c05-71f6-4de9-bd98-76a34d4270ad)

This screenshot shows the GET routes in the server.js file. (Notice I chose to include a custom 404.html page)

![post and delete routes in notes js](https://github.com/ColinBurner/SVG-logo-generator/assets/85810714/82473e21-7841-4861-95dc-5d9995dfc47e)

This screenshot shows the POST and DELETE routes in the notes.js file.

![404 error page](https://github.com/ColinBurner/SVG-logo-generator/assets/85810714/b0ec9594-8442-46e7-a140-893d7d936315)

This screenshot demonstrates the custom 404.html file. (try it out by putting /anythingyouwant at the end of the URL)


## License

This project is licensed under the MIT license. For more information, please visit [this link](https://opensource.org/licenses/MIT).

## Contributing

N/A

## Roadmap

This application is finished.

## Tests

I tested the backend code using Insomnia.

## Questions

If you have any questions about the repo, open an issue or contact me directly at b2rn3r@yahoo.com. You can find more of my work at [ColinBurner](https://github.com/ColinBurner/).