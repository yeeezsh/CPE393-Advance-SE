export default (
  original?: string,
): {
  domain: string;
  original: string;
} => {
  if (!original)
    return {
      domain: '',
      original: '',
    };
  let domain = undefined;
  const domainPattern = /^.*(?:(?:http(?:|s):\/\/|(?:www\.)))(.*(?:\/)|(?:.*))/;
  const domainMatch = original.match(domainPattern);
  if (domainMatch) [, domain] = domainMatch;

  return {
    domain: domain || original,
    original,
  };
};
