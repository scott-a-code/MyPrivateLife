if (process.env.NODE_ENV !== 'prod') {
    require('dotenv').config();
}

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
})