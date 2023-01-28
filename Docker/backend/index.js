const express = require('express');
const app = express();

app.use(express.json());

app.listen(8080, (err) => {
    if (err) {
        console.log(`Error: ${err}`);
    }

    console.log('Success');
});
