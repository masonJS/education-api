import { Test } from '@nestjs/testing';
import { Mailer } from '@app/mailer/src/Mailer';
import { getMailerModule } from '@app/mailer/src/MailerModule';
import { LocalstackEmailVerifier } from '../util/LocalstackEmailVerifier';

describe('Mailer', () => {
  let mailer: Mailer;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getMailerModule()],
    }).compile();

    mailer = module.get<Mailer>(Mailer);
  });

  it('등록하지 않은 from 이메일 주소로는 전송이 실패한다', async () => {
    const result = mailer.send(
      'invalid@inflab.com',
      'foobar@inflab.com',
      'subject',
      'content',
      [],
    );

    await expect(result).rejects.toThrowError();
  });

  it('직접 등록한 from 주소로 설정시 전송은 성공한다', async () => {
    const verifiedEmail = 'foo@inflab.com';
    await LocalstackEmailVerifier.verify(verifiedEmail);

    await mailer.send(
      verifiedEmail,
      'foobar@inflearn.com',
      'subject',
      'content',
      [],
    );
  });
});
