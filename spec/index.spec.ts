/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Tests on config generation
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { readdir } from 'fs/promises';
import { resolve } from 'path';

import configure from '#index';

const mockLoadYAML = jest.fn(async (_template: string) => ({}));
const mockLoadText = jest.fn(async (_template: string) => '');
jest.mock('presetter-preset-react', () => ({
  __esModule: true,
  ...jest.requireActual('presetter-preset-react'),
  default: jest.fn(() => ({
    links: {
      '.config': 'config',
    },
    scripts: {
      script: 'script',
    },
  })),
  createLinker: jest.fn(() => ({
    json: async (template: string) => {
      await mockLoadYAML(template);
      return template;
    },
    list: async (template: string) => {
      await mockLoadText(template);
      return template;
    },
    text: async (template: string) => {
      await mockLoadText(template);
      return template;
    },
  })),
  loadYAML: jest.fn().mockImplementation((template) => mockLoadYAML(template)),
  loadText: jest.fn().mockImplementation((template) => mockLoadText(template)),
}));

describe('fn:configure', () => {
  beforeEach(jest.clearAllMocks);
  const target = { name: 'project', root: '/path/to/project' };

  it('export preset configuration', async () => {
    const expected = {
      links: {
        '.config': 'config',
      },
      scripts: {
        script: 'script',
      },
    };

    expect(
      await configure({
        config: {},
        target,
      }),
    ).toEqual(expected);
  });

  it('use all templates', async () => {
    await configure({ target, config: {} });

    const files = await readdir(resolve(__dirname, '..', 'templates'));
    const yamlFiles = files.filter((file) => file.endsWith('.yaml'));
    const textFiles = files.filter((file) => !file.endsWith('.yaml'));

    expect(mockLoadText).toHaveBeenCalledTimes(textFiles.length);
    for (const file of textFiles) {
      expect(mockLoadText).toHaveBeenCalledWith(file);
    }

    expect(mockLoadYAML).toHaveBeenCalledTimes(yamlFiles.length);
    for (const file of yamlFiles) {
      expect(mockLoadYAML).toHaveBeenCalledWith(file.replace(/\.yaml$/, ''));
    }
  });
});
