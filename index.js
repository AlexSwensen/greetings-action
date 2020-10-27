const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload;

  // to get a octokit context we need, use an environment variable for the token
  const token =  process.env['GITHUB_TOKEN'];
  const prNumber = github.context.payload.pull_request.number;

  const requestPayload = {
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.pull_request.number
  }

  const octokit = github.getOctokit(token);

  octokit.issues.createComment({...requestPayload, body: "foobar"}).then(resp => {
    console.log('success')
  }, err => {
    console.log(err);
  })
  
} catch (error) {
  core.setFailed(error.message);
}