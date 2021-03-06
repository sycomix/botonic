import { Command, flags } from '@oclif/command'
import * as path from 'path'

import { spawnNpmScript, track } from '../utils'

export default class Run extends Command {
  static description = 'Serve your bot in your localhost'

  static examples = [
    `$ botonic train
    TRAINING MODEL FOR {LANGUAGE}...
    `,
  ]

  static flags = {
    lang: flags.string(),
  }

  static args = []

  async run(): Promise<void> {
    const botonicNLUPath: string = path.join(
      process.cwd(),
      'node_modules',
      '@botonic',
      'nlu'
    )
    try {
      await import(botonicNLUPath)
    } catch (e) {
      console.log(
        `You don't have @botonic/plugin-nlu installed.\nPlease, install it by typing the following command:`
          .red
      )
      console.log(`$ npm install @botonic/plugin-nlu`)
      return
    }
    track('Trained with Botonic train')
    spawnNpmScript('train', () => 'Finished training')
  }
}
