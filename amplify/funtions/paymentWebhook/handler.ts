/* eslint-disable @typescript-eslint/no-unused-vars */
// import {env} from '$amplify/env/main'
// import { verifyPaymentWebhook} from './utils/verifyPaymentWebhook'
// import {generatePresignedUrl} from './utils/generatePresignedUrl'
// import {sendHTMLEmail} from './utils/sendHTMLEmail'

// const proseeddFields = async (
//     fieldsDate: [{label: string; value: string}]
// ) => {
//     const email = fieldsDate.find((field)=> field.label === 'email')!.value
//     const firstName = fieldsDate.find((field)=> field.label === 'firstName')!.value

//     console.log(email, firstName)

//     const url = await generatePresignedUrl(
//         env.SONG_STORAGE_BUCKET_NAME,
//         env.SONG_PATH,
//         3600
//     )

//     await  sendHTMLEmail(
//         env.VERIFIED_SES_FROM_EMAIL,
//         [email],
//         'Your song has arrived',
//         `
//         <html>
//         <body>
//         <h1> Hello from My music! </h1>
//         <p> Hey ${firstName}, thanks so much for your purchase! </p>
//         <p>Here is <a href="${url}">your song </a> Hope you enjoy!</p>
//         </body>
//         </html>
//         `
//     )

//     export const handler = async (event: {
//         body: string,
//         headers: {['payment-signature']: string}
//     }) => {
//         const validateWebhookPayload = await verifyPaymentWebhook(
//             event.body,
//             event.headers['payment-signature'],
//             env.SIGNATURE
//         )

//         switch (validateWebhookPayload.eventType){
//             case 'FROM_RESPONSE':
//                 await processFields(validateWebhookPayload.data.fields)
//                 break
//             default:
//                 break
//         }
//     }
//     return 'Function end!'
// }

import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here
  console.log(event)
  return 'Hello, World!';
};