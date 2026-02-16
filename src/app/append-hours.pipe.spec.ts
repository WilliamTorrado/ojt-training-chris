import { AppendHoursPipe } from './append-hours.pipe';

describe('AppendHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new AppendHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
