import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

const config = new pulumi.Config();
const petNameLength = config.getNumber("petNameLength") ?? 5
const petNameSeparator = config.get("petNameSeparator") ?? "-"

export const randomPet = new random.RandomPet("actionsPet", {
    length: petNameLength,
    separator: petNameSeparator,
})




