"use strict";
const ElasticSearch = require("./models/elasticsearch");

module.exports.getPeople = async (event, context, callback) => {
  try {
    const data = await ElasticSearch.getPeople(event.queryStringParameters);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        peopleLikeYou: data
      })
    };

    callback(null, response);
  } catch (err) {
    console.log(err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: true
      })
    });
  }
};
