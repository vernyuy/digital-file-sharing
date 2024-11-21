import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import {paymentWebhook} from './funtions/paymentWebhook/resource'
import {FunctionUrlAuthType} from 'aws-cdk-lib/aws-lambda'
import { Stack } from "aws-cdk-lib";
import {
  AuthorizationType,
  Cors,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend =  defineBackend({
  auth,
  data,
  storage,
  paymentWebhook,
});

const funcURL = backend.paymentWebhook.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.AWS_IAM
})

backend.paymentWebhook.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['ses:sendemail', 'ses:SendRawEmail'],
    resources: ['*']
  })
)

backend.addOutput({
  custom: {
    paymentWebhookUrl: funcURL.url
  }
})


// create a new API stack
const apiStack = backend.createStack("api-stack");


// create a new REST API
const myRestApi = new RestApi(apiStack, "RestApi", {
  restApiName: "digitalFileApi",
  deploy: true,
  deployOptions: {
    stageName: "dev",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
    allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
    allowHeaders: Cors.DEFAULT_HEADERS, // Specify only the headers you need to allow
  },
});

// create a new Lambda integration
const lambdaIntegration = new LambdaIntegration(
  backend.paymentWebhook.resources.lambda
);


// create a new resource path with IAM authorization
const itemsPath = myRestApi.root.addResource("items", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE,
  },
});

itemsPath.addMethod("POST", lambdaIntegration);

// add a proxy resource path to the API
itemsPath.addProxy({
  anyMethod: true,
  defaultIntegration: lambdaIntegration,
});

// create a new IAM policy to allow Invoke access to the API
 new Policy(apiStack, "RestApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        `${myRestApi.arnForExecuteApi("*", "/items", "dev")}`,
      ],
    }),
  ],
});

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [myRestApi.restApiName]: {
        endpoint: myRestApi.url,
        region: Stack.of(myRestApi).region,
        apiName: myRestApi.restApiName,
      },
    },
  },
});
