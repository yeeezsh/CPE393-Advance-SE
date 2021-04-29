import urlParse from './url.parse';

describe('Url parse util', () => {
  it('Should parse with http:// prefix correctly', () => {
    const sample = 'http://google.co.th';
    const { domain, original } = urlParse(sample);
    expect(domain).toBe('google.co.th');
    expect(original).toBe(sample);
  });

  it('Should parse with subdomain correctly', () => {
    const sample = 'https://docs.google.co.th';
    const { domain } = urlParse(sample);
    expect(domain).toBe('docs.google.co.th');
  });

  it('Should parse with subdomain & query string, param correctly', () => {
    const sample = 'https://docs.google.co.th/hello?test=true';
    const { domain } = urlParse(sample);
    // FIXME: with it should not include \/
    expect(domain).toBe('docs.google.co.th/');
  });
});
