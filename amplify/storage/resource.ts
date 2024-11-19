import { defineStorage } from "@aws-amplify/backend";
import {paymentWebhook} from '../funtions/paymentWebhook/resource'

export const storage = defineStorage({
  name: 'songStorage',
  access: (allow) => ({
    'songs/*': [allow.resource(paymentWebhook).to(['read'])]
  })
})