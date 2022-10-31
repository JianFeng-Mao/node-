exports.filterAttrs = (obj, ...attrs) => {
  if(!obj || typeof obj !== 'object') {
    return {}
  }

  let res = {}
  for (const key in obj) {
    if (attrs.includes(key)) {
      res[key] = obj[key];
    }
  }
  return res
}