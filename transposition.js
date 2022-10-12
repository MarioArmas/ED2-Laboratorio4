export function encrypt(password, message) {
  const fullLength = message.length
  const array = [password]
  const passwordLength = password.length
  for (let i = 0; i < Math.ceil(fullLength / passwordLength); i++) {
    array.push(message.substring(0 + passwordLength * i, passwordLength + passwordLength * i))
  }

  while (array[array.length - 1].length !== passwordLength) {
    array[array.length - 1] += ' '
  }

  const matrix = array.map(string => {
    return string.split('')
  })

  const columns = rotateMatrix(matrix, passwordLength)
  const result = columns.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
  result.forEach(array => {
    array.shift()
  })

  const matrix2 = rotateMatrix(result, matrix.length - 1)
  const encrypted = matrix2.flat(1).map(letter => String.fromCharCode(letter.charCodeAt(0) + passwordLength)).join('')

  return encrypted
}

export function decrypt(password, encrypted) {
  const passwordLength = password.length
  const message = encrypted.split('').map(letter => String.fromCharCode(letter.charCodeAt(0) - passwordLength)).join('')
  const fullLength = message.length
  const sortedPassword = password.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('')
  const array = [sortedPassword]

  for (let i = 0; i < Math.ceil(fullLength / passwordLength); i++) {
    array.push(message.substring(0 + passwordLength * i, passwordLength + passwordLength * i))
  }
  const matrix = array.map(string => {
    return string.split('')
  })
  
  const matrix2 = rotateMatrix(matrix, passwordLength)
  const matrixResult = []
  
  for (let i = 0; i < password.length; i++) {
    for (let j = 0; j < matrix2.length; j++) {
      if (matrix2[j][0] === password[i]) {
        matrixResult.push(matrix2[j])
        matrix2.splice(j, 1)
        break
      }
    }
  }
  const matrixResult2 = rotateMatrix(matrixResult, matrixResult[0].length)
  matrixResult2.shift()
  
  return matrixResult2.flat(1).join('').trim()
}

function rotateMatrix(matrix, length) {
  const columns = []
  for (let i = 0; i < length; i++) {
    const column = []
    matrix.forEach(row => {
      column.push(row[i])
    })
    columns.push(column)
  }

  return columns
}