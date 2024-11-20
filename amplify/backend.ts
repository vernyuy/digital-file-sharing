import { defineBackend } from '@aws-amplify/backend';
// import { auth } from './auth/resource';
// import { data } from './data/resource';
import { storage } from './storage/resource';
import {paymentWebhook} from './funtions/paymentWebhook/resource'
import {FunctionUrlAuthType} from 'aws-cdk-lib/aws-lambda'
import {PolicyStatement } from 'aws-cdk-lib/aws-iam'

const backend =  defineBackend({
  storage,
  paymentWebhook,
});

const funcURL = backend.paymentWebhook.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE
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