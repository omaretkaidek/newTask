const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./modules/User/Routes/user.api.routes');
const apartmentRoutes = require('./modules/Apartment/Routes/apartment.api.routes');
const neighbourhoodRoutes = require('./modules/Neighbourhood/Routes/neighbourhood.api.routes');
const groupRoutes = require('./modules/Group/Routes/group.api.routes');
const permissionRoutes = require('./modules/Permissions/Routes/permissions.api.routes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the user routes
app.use('/api', userRoutes);
app.use('/api', apartmentRoutes);
app.use('/api', neighbourhoodRoutes);
app.use('/api', groupRoutes);
app.use('/api', permissionRoutes);
// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes, if needed
