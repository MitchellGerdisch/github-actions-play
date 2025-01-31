# github-actions-play

This repo contains examples of:
- pulumi preview on creation of github PR
- pulumi update on merge of PR or commit of a change to a branch
- Github workflows that include:
  - unit tests
  - integration tests

## Use/Demo

Note: Branch name and stack name must match. Currently, things are set up for a `main` branch and a `dev` branch.

- Create a `dev` branch if not already exist.
- Modify the code to default to a separator of `*` or a length greater than 4 - see src/infra.ts
  - This will cause the unit test to fail.
- Push the branch.
- Watch the github actions for the repo.
  - The `unit test` job should fail since length greater than 4 or an asterisk separator is not allowed. 
- Fix the code 
  - BUT, in `Pulumi.dev.yaml` set `petNameLength` or `petNameSeparator` to greater than 4 or `*`.
  - You can talk to how the unit testing finds problems in the code but not the run time (i.e. the config). That's what integration testing addresses.
- Push the branch
  - Github unit test job should succeed.
  - integration test job should fail.
- Fix the config
- Push the branch
  - Github workflow should fully succeed.
- Create PR to main
  - Github workflow should run to create preview and attach to the PR
- Merge the PR 
  - Github workflow should run to update main stack (including unit and integration testing which should pass).
    - You can tinker with length or separator in `Pulumi.yaml` global config settings and show the merge fail since main is using those values. 

## Integration Testing Notes

- Docs page: https://www.pulumi.com/docs/iac/concepts/testing/integration/ 
- Integration Test Framework Inputs: https://pkg.go.dev/github.com/pulumi/pulumi/pkg/testing/integration#ProgramTestOptions 
- Currently because integration tests use local backend, you cannot use ESC environments in your stack config.
