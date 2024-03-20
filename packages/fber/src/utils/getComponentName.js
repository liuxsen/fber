exports.capitalizeFirstLetter = function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (match) => {
    return match.toUpperCase()
  })
}
