import path from 'path'
import { ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils'

import {
  docsUrl,
  pipeableSelect,
  findNgRxStoreName,
  storeSelect,
} from '../../utils'

export const methodSelectMessageId = 'storeSelect'
export const operatorSelectMessageId = 'operatorSelect'

export type MessageIds =
  | typeof methodSelectMessageId
  | typeof operatorSelectMessageId

export const OPERATOR = 'operator'
export const METHOD = 'method'

type Options = [{ mode: string }]

export default ESLintUtils.RuleCreator(docsUrl)<Options, MessageIds>({
  name: path.parse(__filename).name,
  meta: {
    type: 'problem',
    docs: {
      category: 'Best Practices',
      description: `Selectors can be used either with 'select' as a pipeable operator or as a method`,
      recommended: 'warn',
    },
    schema: [
      {
        type: 'object',
        properties: {
          mode: {
            enum: [OPERATOR, METHOD],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      [methodSelectMessageId]:
        'Selectors should be used with select method: this.store.select(selector)',
      [operatorSelectMessageId]:
        'Selectors should be used with the pipeable operator: this.store.pipe(select(selector))',
    },
  },
  defaultOptions: [{ mode: METHOD }],
  create: (context, [{ mode }]) => {
    const storeName = findNgRxStoreName(context)
    if (!storeName) return {}

    if (mode === METHOD) {
      return {
        [pipeableSelect(storeName)](node: TSESTree.CallExpression) {
          context.report({
            node,
            messageId: methodSelectMessageId,
          })
        },
      }
    }

    return {
      [storeSelect(storeName)](node: TSESTree.CallExpression) {
        context.report({
          node,
          messageId: operatorSelectMessageId,
        })
      },
    }
  },
})
