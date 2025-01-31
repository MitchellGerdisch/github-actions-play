package petname

import (
	"fmt"
	"os"
	"path"
	"testing"

	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
	"github.com/stretchr/testify/assert"
)

func TestRandomPet(t *testing.T) {
	cwd, err := os.Getwd()
	if err != nil {
		t.FailNow()
	}

	test := integration.ProgramTestOptions{
		// Get branch name if env var is set - github workflow sets this based on branch being udpated
		// If not set it will just use default stack name generated by testing framework which is a concatenation of hostname and folder - i.e. essentially ignored. 
		StackName:	 os.Getenv("BRANCHNAME"), 
		Dir:         path.Join(cwd, "..", "..", "src"),
		Quick:       true,
		SkipRefresh: true,
		ExtraRuntimeValidation: func(t *testing.T, stack integration.RuntimeValidationStackInfo) {
			for _, res := range stack.Deployment.Resources {
				if res.Type == "random:index/randomPet:RandomPet" {
					petNameLength := int(res.Outputs["length"].(float64))
					maxLength := 4
					assert.GreaterOrEqual(t, maxLength, petNameLength, fmt.Sprintf("Pet name length is %d which is greater than the max allowed, %d.", petNameLength, maxLength))
				}
			}
		},
	}
	integration.ProgramTest(t, &test)
}
