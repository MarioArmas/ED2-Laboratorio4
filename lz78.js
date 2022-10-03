export function lz78Encoding(text) {
  const dictionary = ['']
  const textCompressed = []
  let charsToAdd = ''
  let dictReference = 0
  let done = true
  
  for (let i of text) {
    charsToAdd += i
    done = true

    for (let j = 1; j < dictionary.length; j++) {
      if (dictionary[j] === charsToAdd) {
        dictReference = j
        j = dictionary.length
        done = false
      }
    }

    if (done) {
      dictionary.push(dictionary[dictReference] + i)
      textCompressed.push({ dictReference, char: i })
      charsToAdd = ''
      dictReference = 0
      done = false
    }
  }

  if (!done) {
    textCompressed.push({ dictReference, char: '' })
    dictReference = 0
  }

  if (textCompressed[textCompressed.length - 1].dictReference === 0 && textCompressed[textCompressed.length - 1].char === '') {
    textCompressed.pop()
  }

  return { dictionary, textCompressed }
}

export function lz78Decoding(dict, textCompressed) {
  let text = ''
  textCompressed.forEach(obj => {
    const { dictReference, char } = obj
    text += dict[dictReference] + char
  })

  return text
}