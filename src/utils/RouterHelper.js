/**
 * Replace parameters of constants routes by params
 * @param route
 * @param params
 * @returns {string}
 */
export function getRouteWithParams(route, params) {
  const regex = /(\/:[\w\s]+)/;
  return `/${route.replace(
    new RegExp(regex, "g"),
    x => `/${params[x.substr(2)]}`
  )}`;
}
