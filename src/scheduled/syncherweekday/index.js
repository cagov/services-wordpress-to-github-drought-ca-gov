const endPointsJson = require("@architect/shared/endpoints.json");
const endpoints = endPointsJson.data.projects;
const doProcessEndpoints = require("@architect/shared/process-endpoints.js");

exports.handler = async function http (req) {

  let startTime = new Date().getTime();
  console.log(`starting at ${startTime}`)

  const work = [...endpoints].filter(
    x => (x.enabled)
  );

  try {
    await doProcessEndpoints(work);
  } catch (e) {
    console.log(e);
  }

  let endTime = new Date().getTime();
  let timeElapsed = endTime - startTime;
  console.log(`time elapsed: ${timeElapsed}`)
  
  return
}