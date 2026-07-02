import { VALID_COMPATIBILITY_MATRIX } from '../golden/compatibilityMatrix.valid'

export const INVALID_COMPATIBILITY_MATRIX = {
  ...VALID_COMPATIBILITY_MATRIX,

  adapters: [
    VALID_COMPATIBILITY_MATRIX.adapters[0],
    {
      ...VALID_COMPATIBILITY_MATRIX.adapters[0],
    },
  ],
} satisfies unknown
