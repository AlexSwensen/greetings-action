const core = require('@actions/core');
const github = require('@actions/github');


async function main() {
  try {
    const token = core.getInput('repo-token') || undefined;

    const prMessage = core.getInput('pr-message') || undefined;

    if(!token) {
      const msg = new Error('A repo-token must be defined.')
      console.log(msg),
      core.setFailed(msg);
    }

    if(!prMessage) {
      const message = new Error('a pr-message must be defined')
      core.setFailed(message);
    }

    const payload = github.context.payload;

    const requestPayload = {
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.pull_request.number
    }

    const client = github.getOctokit(token);

    client.issues.createComment({...requestPayload, body: prMessage}).then(resp => {
      console.log('success')
    }, err => {
      console.log(err);
      core.setFailed(err);
    })
    
  } catch (error) {
    console.log(error);
    core.setFailed(error);
  }

}

main();

