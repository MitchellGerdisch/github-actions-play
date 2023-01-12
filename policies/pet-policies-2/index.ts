import * as random from "@pulumi/random";
import { PolicyPack, validateResourceOfType } from "@pulumi/policy";

new PolicyPack("random-pet-name", {
    policies: [{
        name: "pet-name-length",
        description: "Prohibits short pet-name-lengths (part 2)",
        enforcementLevel: "advisory",
        validateResource: validateResourceOfType(random.RandomPet, (pet, args, reportViolation) => {
            const requiredPetLength = 8
            if ((pet.length) && (pet.length < requiredPetLength)) {
                reportViolation(
                    `pet name should be at least ${requiredPetLength} characters long`
                )
            }
        }),
    }],
});
