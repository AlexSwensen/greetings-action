Action to run upon opening a pr

This helps new users understand how to help themselves more easily

## Inputs

### `repo-token`

**Required** The github token for the repo. This can be passed in with `${{secrets.GITHUB_TOKEN}}`

### `pr-message`

**Required** The message you would like to post as a comment. This can be formatted in markdown.

## Example usage

```yml
  steps:
  - name: Hello world action step
    id: hello
    uses: AlexSwensen/greetings-action@v0.4-alpha
    with:
      repo-token: ${{secrets.GITHUB_TOKEN}}
      pr-message:
      'welcome to my fancy repo, for help feel free to open an issue [here](https://issue-url)'
```
