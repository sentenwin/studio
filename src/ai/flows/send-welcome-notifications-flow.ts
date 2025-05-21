
'use server';
/**
 * @fileOverview A Genkit flow to send welcome SMS and voice call via Twilio.
 *
 * - sendWelcomeNotifications - Sends SMS and voice call to a new user.
 * - WelcomeNotificationsInput - Input type for the flow.
 * - WelcomeNotificationsOutput - Output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import twilio from 'twilio';

// Define input schema - NOT EXPORTED
const WelcomeNotificationsInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  phone: z.string().describe('The phone number of the user in E.164 format (e.g., +1234567890).'),
});
export type WelcomeNotificationsInput = z.infer<typeof WelcomeNotificationsInputSchema>;

// Define output schema - NOT EXPORTED
const WelcomeNotificationsOutputSchema = z.object({
  smsStatus: z.string().describe('Status of the SMS notification (e.g., "sent", "failed", "skipped").'),
  callStatus: z.string().describe('Status of the voice call notification (e.g., "initiated", "failed", "skipped").'),
  error: z.string().optional().describe('Error message if any notification failed.'),
});
export type WelcomeNotificationsOutput = z.infer<typeof WelcomeNotificationsOutputSchema>;

// Exported wrapper function
export async function sendWelcomeNotifications(input: WelcomeNotificationsInput): Promise<WelcomeNotificationsOutput> {
  return sendWelcomeNotificationsFlow(input);
}

const sendWelcomeNotificationsFlow = ai.defineFlow(
  {
    name: 'sendWelcomeNotificationsFlow',
    inputSchema: WelcomeNotificationsInputSchema,
    outputSchema: WelcomeNotificationsOutputSchema,
  },
  async (input) => {
    const { name, phone } = input;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error('Twilio credentials or phone number not configured in environment variables.');
      return {
        smsStatus: 'skipped - Twilio not configured',
        callStatus: 'skipped - Twilio not configured',
        error: 'Twilio credentials or phone number not configured.',
      };
    }

    if (!phone) {
        return {
            smsStatus: 'skipped - no phone number provided',
            callStatus: 'skipped - no phone number provided',
        };
    }

    const client = twilio(accountSid, authToken);
    let smsSent = false;
    let callInitiated = false;
    let flowError: string | undefined = undefined;

    // Send SMS
    try {
      const smsMessage = `Welcome to Open MaduraAI, ${name}! We're excited to have you.`;
      await client.messages.create({
        body: smsMessage,
        from: twilioPhoneNumber,
        to: phone, // Assumes phone is in E.164 format
      });
      smsSent = true;
      console.log(`SMS sent to ${phone}`);
    } catch (error: any) {
      console.error(`Failed to send SMS to ${phone}:`, error.message);
      flowError = `SMS failed: ${error.message}`;
    }

    // Make Voice Call
    try {
      // TwiML for the voice call
      const twiml = new twilio.twiml.VoiceResponse();
      twiml.say(`Hello ${name}, welcome to the Open MaduraAI community. We are thrilled to have you join us.`);
      
      await client.calls.create({
        twiml: twiml.toString(),
        to: phone, // Assumes phone is in E.164 format
        from: twilioPhoneNumber,
      });
      callInitiated = true;
      console.log(`Voice call initiated to ${phone}`);
    } catch (error: any) {
      console.error(`Failed to initiate voice call to ${phone}:`, error.message);
      if (flowError) {
        flowError += `; Call failed: ${error.message}`;
      } else {
        flowError = `Call failed: ${error.message}`;
      }
    }

    return {
      smsStatus: smsSent ? 'sent' : (flowError && flowError.includes('SMS failed') ? 'failed' : 'skipped'),
      callStatus: callInitiated ? 'initiated' : (flowError && flowError.includes('Call failed') ? 'failed' : 'skipped'),
      error: flowError,
    };
  }
);
