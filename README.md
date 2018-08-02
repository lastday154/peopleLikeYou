# AWS lambda URL

https://ew1xmkcga4.execute-api.us-east-1.amazonaws.com/dev/people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false

# Installation

`npm install`

# Run Local

- Change env.yml -> `run: dev`
- `serverless offline start`

# Production Deployment

- env.yml:
  RUN: prod
- `serverless deploy`

# Run Test

`npm test`

#### Sample responses

**Match found**

    GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false

```json
{
  "peopleLikeYou": [
    {
      "name": "Dorthea",
      "age": 24,
      "latitude": "40.7232",
      "longitude": "19.55256",
      "monthlyIncome": 5532,
      "experienced": false,
      "score": 0.9
    },
    {
      "name": "Francesco",
      "age": 25,
      "latitude": "40.7223",
      "longitude": "19.55264",
      "monthlyIncome": 5578,
      "experienced": false,
      "score": 0.9
    },
    {
      "name": "Jarib",
      "age": 20,
      "latitude": "40.7232",
      "longitude": "19.55256",
      "monthlyIncome": 5700,
      "experienced": true,
      "score": 0.8
    },
    {
      "name": "Merv",
      "age": 22,
      "latitude": "40.7233",
      "longitude": "19.5526",
      "monthlyIncome": 6309,
      "experienced": true,
      "score": 0.6
    },
    {
      "name": "Jorrie",
      "age": 19,
      "latitude": "40.7344",
      "longitude": "19.6200",
      "monthlyIncome": 6488,
      "experienced": false,
      "score": 0.6
    },
    {
      "name": "Branden",
      "age": 27,
      "latitude": "40.4522",
      "longitude": "19.67011",
      "monthlyIncome": 4312,
      "experienced": false,
      "score": 0.5
    },
    {
      "name": "Delila",
      "age": 30,
      "latitude": "40.49492",
      "longitude": "19.25686",
      "monthlyIncome": 7340,
      "experienced": false,
      "score": 0.5
    },
    {
      "name": "Franzen",
      "age": 40,
      "latitude": "40.99926",
      "longitude": "20.55256",
      "monthlyIncome": 7437,
      "experienced": false,
      "score": 0.4
    },
    {
      "name": "Latrena",
      "age": 42,
      "latitude": "40.99232",
      "longitude": "19.55256",
      "monthlyIncome": 8822,
      "experienced": true,
      "score": 0.4
    },
    {
      "name": "Ulberto",
      "age": 37,
      "latitude": "41.7232",
      "longitude": "19.75256",
      "monthlyIncome": 8129,
      "experienced": true,
      "score": 0.4
    }
  ]
}
```

**Match not found**

    GET /people-like-you?age=1000

```json
{
  "peopleLikeYou": []
}
```

## Guidelines

- Your code should be written in JS
- Design and implement your solution as you would do for real production code
- Don't forget unit tests
- You can add new features to your liking
- Your submission would be reviewed based on these criteria:
  - Performance
  - Code quality
  - Tooling choices
  - Additional features
- To submit your work, deploy the app to a public cloud and give us the URL. You’ll also need to send us the link of the repository containing the required source to us and we are willing to have a look on how you build the system step by step
- DO NOT copy a solution. If we found your work is exactly same with another candidate, we may have to terminate the review process
