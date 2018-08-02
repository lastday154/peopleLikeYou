"use strict";

const elasticsearch = require("elasticsearch");
const bodybuilder = require("bodybuilder");
const { forEach, map, pick } = require("lodash");

const client = new elasticsearch.Client({
  host:
    process.env.RUN === "dev"
      ? "localhost:9200"
      : "https://search-faq-staging-nwt2m3iq6falf52dhkxc2ia4me.us-east-2.es.amazonaws.com",
  log: "trace"
});

const buildQuery = params => {
  const query = bodybuilder().size(10);
  forEach(params, (value, key) => {
    query.orQuery("match", key, value);
  });
  return query.build();
};
const getPeople = async params => {
  const query = buildQuery(params);
  try {
    const result = await client.search({
      index: "people",
      type: "person",
      body: query
    });
    const { hits } = result.hits;
    if (hits.length === 0) {
      return [];
    }
    const maxScore = hits[0]._score;
    return map(hits, item => {
      const source = item._source;
      return {
        name: source.name,
        age: source.age,
        latitude: source.latitude,
        longitude: source.longitude,
        monthlyIncome: source.monthlyIncome,
        experienced: source.experienced,
        score: item._score / maxScore
      };
    });
  } catch (err) {
    console.log(err);
    return [];
  }
};

module.exports = {
  getPeople,
  buildQuery,
  client
};
