const core = require('@actions/core');
const github = require('@actions/github');


async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    const token = core.getInput('repo-token') || undefined;

    if(!token) {
      const msg = new Error('A repo-token must be defined.')
      console.log(msg),
      core.setFailed(msg);
    }
    
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = github.context.payload;
  

    const requestPayload = {
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.pull_request.number
    }
    console.log('this worked');
    const client = github.getOctokit(token);
    console.log('octokit initialized')
  
    client.issues.createComment({...requestPayload, body: "foobar"}).then(resp => {
      console.log('success')
    }, err => {
      console.log(err);
    })
    
  } catch (error) {
    console.log(error);
    core.setFailed(error);
  }

}

main();

