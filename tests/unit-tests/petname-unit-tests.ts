import * as pulumi from "@pulumi/pulumi";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("Infrastructure", function() {
  let infra: typeof import("../../src/infra");

  before(async function() {
      // It's important to import the program _after_ the mocks are defined.
      infra = await import("../../src/infra");
  })

  describe("#petname", function() {
      // (check 1): Petname must not consist of more than 4 words.
      // In terms of unit testing, this only catches the case where the property is explicitly set to a value greater than 4, or
      // if the default is set to a value greater than 4.
      // It does not catch the case Pulumi config value is set to greater than 4.
      // That's where the integration tests come in since they actually stand up the stack.
      it("must not consist of more than 4 words", function(done) {
        pulumi.all([infra.randomPet.urn, infra.randomPet.length]).apply(([urn, length]) => {
            if (!length || length > 4) {
                done(new Error(`Petname resource, ${urn}, must not consist of more than 4 words`));
            } else {
                done();
            }
        });
      });



      // TODO(check 2): If separator is set, it cannot be "*".
      it("must not use asterisk (*) as a separator", function(done) {
        pulumi.all([infra.randomPet.urn, infra.randomPet.separator]).apply(([urn, separator]) => {
            if (!separator || separator == "*") {
                done(new Error(`Petname resource, ${urn}, must not use asterisk (*) as a separator`));
            } else {
                done();
            }
        });
      });
  });

  // describe("#group", function() {
  //     // TODO(check 3): Instances must not have SSH open to the Internet.
  // });
});