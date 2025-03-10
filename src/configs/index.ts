import type { TSESLint } from '@typescript-eslint/experimental-utils'

import { traverseFolder } from '../utils'
import { RuleModule } from '../utils/types'

// Copied from https://github.com/jest-community/eslint-plugin-jest/blob/main/src/index.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interopRequireDefault = (obj: any): { default: unknown } =>
  obj?.__esModule ? obj : { default: obj }

const importDefault = (moduleName: string) =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  interopRequireDefault(require(moduleName)).default

const configDir = __dirname
const excludedFiles = ['index']

export const configs = Array.from(traverseFolder(configDir))
  .filter((config) => !excludedFiles.includes(config.file))
  .reduce((allConfigs, config) => {
    const entry = importDefault(config.path) as TSESLint.Linter.RuleEntry
    return {
      ...allConfigs,
      [config.file]: entry,
    }
  }, {} as Record<string, TSESLint.Linter.RuleEntry>)
