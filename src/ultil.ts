export const parserRequestUrl = () => {
  const url = window.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
  };
};

export const $ = (selector) => {
  let elements = document.querySelectorAll(selector);
  return elements.length == 1 ? elements[0] : elements;
};
