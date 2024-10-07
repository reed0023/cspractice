const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const scriptsPath = path.join(__dirname, 'scripts');

app.get('/scripts', (req, res) => {
    fs.readdir(scriptsFolder, (err, files) => {
        if (err) {
            console.error('Error reading scripts folder:', err);
            res.status(500).send('Error reading scripts folder');
            return;
        }

        const scriptFiles = files.filter(file => file.endsWith('.txt') || file.endsWith('.py') || file.endsWith('.js'));
        if (scriptFiles.length === 0) {
            res.status(500).send('No script files found');
            return;
        }

        const randomFile = scriptFiles[Math.floor(Math.random() * scriptFiles.length)];
        fs.readFile(path.join(scriptsFolder, randomFile), 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading script file:', err);
                res.status(500).send('Error reading script file');
                return;
            }
            res.send(data);
        });
    });
});


app.use(express.static('.')); // Serve your static files (HTML, CSS, JS)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
