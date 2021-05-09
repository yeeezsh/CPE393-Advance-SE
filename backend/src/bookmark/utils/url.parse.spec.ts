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

  it('Should parse with subdomain & prefix www. correctly', () => {
    const sample = 'http://wwww.docs.google.co.th';
    const { domain } = urlParse(sample);
    expect(domain).toBe('docs.google.co.th');
  });

  it('Should parse with subdomain & query string, param correctly', () => {
    const sample = 'https://docs.google.co.th/hello?test=true';
    const { domain } = urlParse(sample);
    expect(domain).toBe('docs.google.co.th');
  });

  it('Should parse with multiple subdomain & query string, param correctly', () => {
    const sample = 'https://github.com/yee2542/CPE393-Advance-SE/pull/42';
    const { domain } = urlParse(sample);
    expect(domain).toBe('github.com');
  });
});
