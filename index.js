/**
 * Introduce keyboard typos into a string
 * @module typo
 * @param {string} string  - String to misstype
 * @param {object} options
 * @param {number} options.adjacent - Probability of fat finger QWERTY typos (0-1)
 * @param {number} options.double - Probability of double character typos (0-1)
 * @param {number} options.order - Probability of character order typos (0-1)
 */
module.exports = function (input, options) {
  const NEIGHBORS = {
    'Q': ['W', 'A'],
    'W': ['Q', 'A', 'S', 'E'],
    'E': ['W', 'S', 'D', 'R'],
    'R': ['E', 'D', 'F', 'T'],
    'T': ['R', 'F', 'G', 'Y'],
    'A': ['Q', 'Z', 'W', 'S'],
    'S': ['W', 'A', 'Z', 'X', 'D', 'E'],
    'D': ['E', 'S', 'X', 'C', 'F', 'R'],
    'F': ['R', 'D', 'C', 'V', 'G', 'T'],
    'G': ['T', 'F', 'V', 'B', 'H', 'Y'],
    'Z': ['A', 'S', 'X'],
    'X': ['S', 'Z', 'D', 'C'],
    'C': ['D', 'X', 'F', 'V'],
    'V': ['F', 'C', 'B', 'G'],
    'B': ['G', 'V', 'N', 'H'],
    'Y': ['T', 'G', 'H', 'U'],
    'U': ['Y', 'H', 'J', 'I'],
    'I': ['U', 'J', 'K', 'O'],
    'O': ['I', 'K', 'L', 'P'],
    'P': ['O', 'L'],
    'H': ['Y', 'G', 'B', 'N', 'J', 'U'],
    'J': ['U', 'H', 'N', 'M', 'K', 'I'],
    'K': ['I', 'J', 'M', 'L', 'O'],
    'L': ['O', 'K', 'P'],
    'N': ['H', 'B', 'M', 'J'],
    'M': ['J', 'N', 'K']
  }
  const probability = function (n) { return !!n && Math.random() <= n }
  let output = ''
  // Adjacent Typos
  if (options.adjacent) {
    input.split('').forEach(function (c) {
      let localNeighbors = NEIGHBORS[c.toUpperCase()]
      if (localNeighbors && probability(options.adjacent)) {
        output += localNeighbors[Math.floor(Math.random() * localNeighbors.length)]
      } else {
        output += c
      }
    })
  } else {
    output = input
  }
  // Order typos
  if (options.order) {
    let outputArray = output.split('')
    output = ''
    outputArray.forEach(function (c, index) {
      if (!((c <= 32 && outputArray[index] >= 0) || outputArray[index] === 127) && !((c <= 32 && outputArray[index + 1] >= 0) || outputArray[index + 1] === 127)) {
        if (probability(options.order)) {
          var temp = outputArray[index]
          outputArray[index] = outputArray[index + 1]
          outputArray[index + 1] = temp
        }
      }
    })
    output = outputArray.join('')
  }
  // Double typos
  if (options.double) {
    let outputArray = output.split('')
    output = ''
    outputArray.forEach(function (c) {
      if (probability(options.double)) {
        output += c + c
      } else {
        output += c
      }
    })
  }
  return output.toLowerCase()
}
