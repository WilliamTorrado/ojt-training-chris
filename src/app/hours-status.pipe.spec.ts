import { HoursStatusPipe } from './hours-status.pipe';

describe('HoursStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new HoursStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
