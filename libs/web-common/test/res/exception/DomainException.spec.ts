import { DomainException } from '@app/web-common/res/exception/DomainException';

describe('DomainException', () => {
  it('예외 message를 반환한다.', () => {
    // given, when
    const error = DomainException.BadRequest({
      message: 'message',
    });

    // then
    expect(error.message).toBe('message');
  });

  it('예외 parameter를 반환한다.', () => {
    // given, when
    const error = DomainException.BadRequest({
      message: 'message',
      parameter: {
        name: 'name',
      },
    });

    // then
    expect(error.parameter).toStrictEqual({ name: 'name' });
  });
});
