"use strict";

const { expect } = require("chai");
const ElasticSearch = require("../../models/elasticsearch");
const sinon = require("sinon");

describe("ElasticSearch/: ", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  describe("buildQuery: ", () => {
    it("it should build query according to input", async () => {
      const actual = ElasticSearch.buildQuery({
        age: "23",
        latitude: "40.71667",
        longitude: "19.56667",
        monthlyIncome: "5500",
        experienced: "false"
      });
      expect(actual).to.eql({
        size: 10,
        query: {
          bool: {
            should: [
              { match: { age: "23" } },
              { match: { latitude: "40.71667" } },
              { match: { longitude: "19.56667" } },
              { match: { monthlyIncome: "5500" } },
              { match: { experienced: "false" } }
            ]
          }
        }
      });
    });
    it("it should build query according to input with no params", async () => {
      const actual = ElasticSearch.buildQuery();
      expect(actual).to.eql({ size: 10 });
    });
  });
  describe("getPeople: ", () => {
    it("it should return some  people", async () => {
      const result = {
        hits: {
          hits: [
            {
              _index: "people",
              _type: "person",
              _score: 19.707075,
              _source: {
                monthlyIncome: "5132",
                experienced: "false",
                longitude: "19.56667",
                name: "Kendra",
                latitude: "40.71667",
                age: "45"
              }
            },
            {
              _index: "people",
              _type: "person",
              _id: "E9O3-WQBZzel_dkYplSr",
              _score: 19.657156,
              _source: {
                monthlyIncome: "6566",
                experienced: "false",
                longitude: "19.56667",
                name: "Loydie",
                latitude: "40.71667",
                age: "29"
              }
            }
          ]
        }
      };

      sandbox.stub(ElasticSearch.client, "search").resolves(result);
      const actual = await ElasticSearch.getPeople({
        age: "23",
        latitude: "40.71667",
        longitude: "19.56667",
        monthlyIncome: "5500",
        experienced: "false"
      });
      expect(actual).to.eql([
        {
          name: "Kendra",
          age: "45",
          latitude: "40.71667",
          longitude: "19.56667",
          monthlyIncome: "5132",
          experienced: "false",
          score: 1
        },
        {
          name: "Loydie",
          age: "29",
          latitude: "40.71667",
          longitude: "19.56667",
          monthlyIncome: "6566",
          experienced: "false",
          score: 0.9974669503211411
        }
      ]);
    });
    it("it should return no people", async () => {
      sandbox
        .stub(ElasticSearch.client, "search")
        .resolves({ hits: { hits: [] } });
      const actual = await ElasticSearch.getPeople({});
      expect(actual).to.eql([]);
    });
  });
  afterEach(() => {
    sandbox.restore();
  });
});
