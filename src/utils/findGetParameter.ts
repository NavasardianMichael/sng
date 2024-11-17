function findGetParameter(parameterName: string) {
  let result: string = '',
    tmp = []

  window.location.search
    .substr(1)
    .split('&')
    .forEach(function (item) {
      tmp = item.split('=')

      if (tmp[0].toUpperCase() === parameterName.toUpperCase()) {
        result = decodeURIComponent(tmp[1])
      }
    })

  return result
}

export default findGetParameter
