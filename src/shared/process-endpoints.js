const { SyncEndpoint } = require("@cagov/wordpress-to-github");
const {
  slackBotReportError,
  slackBotChatPost,
  slackBotReplyPost
} = require("./slackBot/index.js");

/** @type {GitHubCommitter} **/
const gitHubCommitter = {
  name: `${process.env["GITHUB_NAME"]}`,
  email: `${process.env["GITHUB_EMAIL"]}`
};
/** @type {GitHubCredentials} **/
const gitHubCredentials = {
  token: `${process.env["GITHUB_TOKEN"]}`
};

const {
  GitHubCommitter,
  GitHubCredentials,
  SourceEndpointConfigData
} = require("@cagov/wordpress-to-github/common");

/**
 *
 * @param {SourceEndpointConfigData[]} work
 */
module.exports = async function doProcessEndpoints(work) {
  if (work.length) {
    console.log(`Using ${work.length} endpoint(s)`);
  } else {
    console.error(
      `No endpoints selected.  For debug mode you should set at least one "enabledLocal" to true.`
    );
  }

  for (const endpoint of work) {
    console.log(`*** Checking endpoint for ${endpoint.name} ***`);

    const commitReports = await SyncEndpoint(
      endpoint.GitHubTarget,
      endpoint,
      gitHubCredentials,
      gitHubCommitter
    );

    if (endpoint.ReportingChannel_Slack) {
      //Endpoint reporting channel enabled.  Add a post for each commit report.
      if (commitReports?.length) {
        /** @type {string[]} */
        let mergeFileNames = [];
        commitReports.map(x => {
          mergeFileNames.push(
            ...x.Files.map(
              x => x.filename.split("/").slice(-1)[0].split(".")[0]
            )
          );
        });

        const allfileNames = [...new Set(mergeFileNames)];

        const slackPostTS = (
          await (
            await slackBotChatPost(
              endpoint.ReportingChannel_Slack,
              `${endpoint.name} - _${allfileNames.join(", ")}_`
            )
          ).json()
        ).ts;

        for (const commitReport of commitReports) {
          const fileData = commitReport.Files.map(
            x => `• ${x.status} - _${x.filename.split("/").slice(-1)[0]}_`
          ).join("\n");

          await slackBotReplyPost(
            endpoint.ReportingChannel_Slack,
            slackPostTS,
            `<${commitReport.Commit.html_url}|${commitReport.Commit.message}>\n${fileData}`
          );
        }
      }
    }
  }
};