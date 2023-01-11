const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'd3f71972eaf4457db620b1605e92facd'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
        .then(data => {
        res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
}
const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries ')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get count'));
}

module.exports = {
    handleImage,
    handleApiCall
}