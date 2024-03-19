import { SESClient, VerifyEmailAddressCommand } from '@aws-sdk/client-ses';
import { Configuration } from '@app/config/Configuration';

export class LocalstackEmailVerifier {
  static async verify(email: string): Promise<void> {
    const sesEnv = Configuration.getEnv().ses;

    const client = new SESClient(sesEnv.toSESClientConfig());
    const command = new VerifyEmailAddressCommand({
      EmailAddress: email,
    });
    await client.send(command);
  }
}
