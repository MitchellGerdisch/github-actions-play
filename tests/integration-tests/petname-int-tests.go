package inttest

import (
        "os"
        "path"
        "testing"

        "github.com/pulumi/pulumi/pkg/v2/testing/integration"
)

func TestStack(t *testing.T) {
        // awsRegion := os.Getenv("AWS_REGION")
        // if awsRegion == "" {
        //         awsRegion = "us-west-1"
        // }
        cwd, _ := os.Getwd()
        integration.ProgramTest(t, &integration.ProgramTestOptions{
                Quick:       true,
                SkipRefresh: true,
                Dir:         path.Join(cwd, "..",  "..", "src"),
                CloudURL:    "https://api.pulumi.com",
                StackName:   "MitchellGerdisch/dev",
                Verbose:     true,
                // Config: map[string]string{
                //         "aws:region": awsRegion,
                // },
        })
}