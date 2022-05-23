import {Command, Flags} from '@oclif/core'
import * as fs from 'fs'
import { allowedColors } from '../config/allowedColors'
import { generateMockup } from '../utils/generateMockup'

export default class Generate extends Command {
  static description = 'Generate Printful mockups with ease with this CLI tool!'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // path to assets
    ["input-urls"]: Flags.string({char: 'i', description: 'urls of each source file, comma separated.', required: true}),
    // output path
    ["output-path"]: Flags.string({char: 'o', description: 'path to output folder', required: true}),
    // colors
    ["colors"]: Flags.string({char: 'c', description: 'colors of each mockup to generate, comma separated. Current acceptable values include: black, french-navy, dark-heather-gray, burgundy, red, anthracite, stargazer, dark-heather-blue, sage, dessert-dust, heather-gray, and white.', required: true}),
    // top
    ["top"]:  Flags.string({char: 't', description: 'top margin for print.', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)

    const inputUrls = flags['input-urls']
    const outputPath = flags['output-path']
    const colors = flags['colors']
    const top = flags['top']

    if (parseInt(top) === NaN) {
      throw new Error("Parameter top must be a valid integer.")
    }

    const topNumber = parseInt(top)

    // validate all inputs
    // are input urls valid urls?
    const inputUrlsList = inputUrls.split(',')


    // does output path exist?

    // validate colors
    const colorsList = colors.split(',')
    for (var i = 0; i < colorsList.length; i++) {
      if (!allowedColors.map(allowedColor => allowedColor.cliName).includes(colorsList[i])) {
        this.log(`Invalid color: ${colorsList[i]}`)
        return;
      }
    }

    // Validation, passed, generate!
    inputUrlsList.forEach(async (sourceUrl) => {
      await generateMockup(sourceUrl, outputPath, colorsList, topNumber, this)
    })
  }
}
