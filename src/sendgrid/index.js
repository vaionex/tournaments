import client from "@sendgrid/client";

client.setApiKey(process.env.SENDGRID_API_KEY);

export async function subscribeToNewsletter(email) {
  const data = {
    contacts: [
      {
        email,
      },
    ],
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };

  await client.request(request);
}

export const sgClient = client;
