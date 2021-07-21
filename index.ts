import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";

// actions test 

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup");
export const rgId = resourceGroup.id

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("sa", {
    resourceGroupName: resourceGroup.name,
    sku: {
        name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
});
export const saId = storageAccount.id


// comment to force PR update