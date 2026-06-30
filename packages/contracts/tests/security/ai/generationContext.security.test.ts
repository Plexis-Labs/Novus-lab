import { describe, it } from 'vitest'

describe.skip('GenerationContext Security', () => {
  it.todo('rejects forged GenerationContext payloads before AI submission')

  it.todo('rejects payloads containing raw DOM or HTML content')

  it.todo('rejects payloads attempting to include cookies or session data')

  it.todo('rejects payloads containing browser storage information')

  it.todo('rejects payloads exceeding maximum payload size')

  it.todo('verifies dataPolicy privacy rules before transmission')

  it.todo('verifies selectedText hash integrity')

  it.todo('verifies prompt sanitization before gateway submission')

  it.todo('verifies no browser secrets can be serialized')

  it.todo('ensures generated payload contains only approved entities')
})
