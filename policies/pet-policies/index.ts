import * as random from "@pulumi/random";
import { PolicyPack, validateResourceOfType } from "@pulumi/policy";

new PolicyPack("random-pet-name", {
    policies: [{
        name: "pet-name-length",
        description: "Prohibits pet-name-length shorter than 5",
        enforcementLevel: "advisory",
        validateResource: validateResourceOfType(random.RandomPet, (pet, args, reportViolation) => {
            if ((pet.length) && (pet.length < 5)) {
                reportViolation(
                    "pet name should be at least 5 characters long"
                )
            }
        }),
    }],
});
