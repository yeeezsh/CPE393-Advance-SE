export default (
  original: string,
): {
  domain: string | null;
  original: string;
} => {
  let domain = null;
  const domainPattern = /((http(|s):\/\/)|(www.)|)((.*\/)|(.*$))/;
  const domainMatch = original.match(domainPattern);
  if (domainMatch) [, , , , , domain] = domainMatch;

  return {
    domain,
    original,
  };
};
