const elasticsearch = require('elasticsearch');
const { ES_URL, ES_HTTP_AUTH } = require('../../config');
const client = new elasticsearch.Client({
  host: ES_URL,
  httpAuth: ES_HTTP_AUTH,
  apiVersion: '2.4'
});
const _ = require('lodash');

async function autoCompleteAuthor(query) {
  try {
    // 1. get suggest results
    const suggestion = await handleQuery(query);
    console.log(suggestion);
  } catch (error) {
    console.error(error);
  }
}

// run it
autoCompleteAuthor('Waldo');

function handleQuery(query) {
  return client
    .suggest({
      index: 'names',
      body: {
        'author-suggest': { text: query, completion: { field: 'suggest', fuzzy: { fuzziness: 0 } } }
      }
    })
    .then(suggestion => {
      if (
        suggestion &&
          _.size(suggestion['author-suggest']) &&
          _.size(suggestion['author-suggest'][0].options)
      ) {
        const toReturn = suggestion['author-suggest'][0].options;
        return toReturn;
      }
      return [];
    });
}
