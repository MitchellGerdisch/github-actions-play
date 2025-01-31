package petname

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

        test := integration.ProgramTestOptions{
                Dir:         path.Join(cwd, "..",  "..", "src"),
		Quick:       true,
		SkipRefresh: true,
		Config: map[string]string{
			"aws:region": "us-west-1",
		},
		// ExtraRuntimeValidation: func(t *testing.T, stack integration.RuntimeValidationStackInfo) {
		// 	assertHTTPResult(t, "http://"+stack.Outputs["websiteUrl"].(string), nil, func(body string) bool {
		// 		return assert.Contains(t, body, "Hello, Pulumi!")
		// 	})
		// },
	}
	integration.ProgramTest(t, &test)



        // integration.ProgramTest(t, &integration.ProgramTestOptions{
        //         Quick:       true,
        //         SkipRefresh: true,
        //         // Dir:         path.Join(cwd, "..",  "..", "src"),
        //         Dir:         path.Join(cwd, "src"),
        //         // CloudURL:    "https://api.pulumi.com",
        //         // StackName:   "MitchellGerdisch/dev",
        //         // Verbose:     true,
        //         // Config: map[string]string{
        //         //         "aws:region": awsRegion,
        //         // },
        // })
}