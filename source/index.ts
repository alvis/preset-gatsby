/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Collection of preset assets for a Gatsby project
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

/* istanbul ignore file */

import { resolve } from 'path';

import type { PresetAsset } from 'presetter';

// paths to the template directory
const TEMPLATES = resolve(__dirname, '..', 'templates');
const CONFIGS = resolve(__dirname, '..', 'configs');

/**
 * get the list of templates provided by this preset
 * @returns list of preset templates
 */
export default async function (): Promise<PresetAsset> {
  return {
    extends: [
      'presetter-preset-web',
      'presetter-preset-react',
      'presetter-preset-strict',
    ],
    scripts: resolve(TEMPLATES, 'scripts.yaml'),
    template: {
      /* eslint-disable @typescript-eslint/naming-convention */
      '.gitignore': ['/.cache', '/public', '/webpack-*-report.html'].join('\n'),
      /* eslint-enable @typescript-eslint/naming-convention */
    },
    supplementaryConfig: {
      tsconfig: resolve(CONFIGS, 'tsconfig.yaml'),
    },
    supplementaryIgnores: ['.npmignore'],
    variable: {
      source: 'src',
      output: 'public',
    },
  };
}
