import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

const config = new pulumi.Config();
const petNameLength = config.getNumber("petNameLength") ?? 3

const randomPet = new random.RandomPet("actionsPet", {
    length: petNameLength
})

export const petName = randomPet.id;

