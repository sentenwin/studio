
'use server';
/**
 * @fileOverview A Genkit flow to send a welcome email via Zoho ZeptoMail.
 *
 * - sendWelcomeEmail - Sends a templated welcome email to a new user.
 * - WelcomeEmailInput - Input type for the flow.
 * - WelcomeEmailOutput - Output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { SendMailClient } from 'zeptomail';

// Define input schema
const WelcomeEmailInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  email: z.string().email().describe('The email address of the user.'),
});
export type WelcomeEmailInput = z.infer<typeof WelcomeEmailInputSchema>;

// Define output schema
const WelcomeEmailOutputSchema = z.object({
  status: z.string().describe('Status of the email sending operation (e.g., "sent", "failed").'),
  messageId: z.string().optional().describe('Message ID if the email was sent successfully.'),
  error: z.string().optional().describe('Error message if the email sending failed.'),
});
export type WelcomeEmailOutput = z.infer<typeof WelcomeEmailOutputSchema>;

// Exported wrapper function
export async function sendWelcomeEmail(input: WelcomeEmailInput): Promise<WelcomeEmailOutput> {
  return sendWelcomeEmailFlow(input);
}

const sendWelcomeEmailFlow = ai.defineFlow(
  {
    name: 'sendWelcomeEmailFlow',
    inputSchema: WelcomeEmailInputSchema,
    outputSchema: WelcomeEmailOutputSchema,
  },
  async (input) => {
    const { name, email } = input; // 'name' here is the user's name from the form submission

    const zeptoMailApiToken = process.env.ZEPTOMAIL_API_TOKEN;
    const zeptoMailApiUrl = "api.zeptomail.in/v1.1/email/template"; // As per documentation
    const mailTemplateKey = "2518b.342d67e4b2e91d02.k1.1ef09870-36b5-11f0-b421-8e9a6c33ddc2.196f5d68377"; // Your template key

    if (!zeptoMailApiToken) {
      console.error('ZeptoMail API token not configured in environment variables.');
      return {
        status: 'skipped - ZeptoMail not configured',
        error: 'ZeptoMail API token not configured.',
      };
    }

    try {
      const client = new SendMailClient({ url: zeptoMailApiUrl, token: zeptoMailApiToken });

      const response = await client.sendMailWithTemplate({
        mail_template_key: mailTemplateKey,
        from: {
          address: "noreply@openmadurai.org",
          name: "Open MaduraAI"
        },
        to: [
          {
            email_address: {
              address: email,
              name: name // User's name for the 'To' field in the email header
            }
          }
        ],
        merge_info: {
          "username": name, // User's submitted name is used for the 'username' merge tag
          "product name": "Open MaduraAI",
          "product": "https://openmadurai.org",
          "support id": "hello@openmadurai.org",
          "brand": "OpenMaduraAI"
        }
      });
      
      const result = Array.isArray(response) ? response[0] : response;

      if (result && result.messageId) {
        console.log(`Welcome email sent to ${email}, Message ID: ${result.messageId}`);
        return {
          status: 'sent',
          messageId: result.messageId,
        };
      } else {
        console.error(`ZeptoMail API response indicates failure or missing messageId for ${email}:`, response);
        const errorMessage = result?.data?.message || 'ZeptoMail API error: Unknown issue or malformed response.';
        return {
          status: 'failed',
          error: errorMessage,
        };
      }

    } catch (error: any) {
      console.error(`Failed to send welcome email to ${email}:`, error.message, error.details || error);
      const zeptoErrorDetails = error.details?.data?.message || error.message || 'An unexpected error occurred during email sending.';
      return {
        status: 'failed',
        error: `Email sending failed: ${zeptoErrorDetails}`,
      };
    }
  }
);
