/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import * as languageManifest from './config/language.manifest.json';

declare const window: any;
declare const global: any;

const currentLang = typeof window !== 'undefined' ? (window as any).currentLang : (global as any).currentLang;

if (typeof window !== 'undefined') {
  (window as any).languageManifest = languageManifest;
} else {
  (global as any).languageManifest = languageManifest;
}

loadStrings(currentLang).then(i => {});

export async function loadStrings(locale: string) {
  if (!locale) {
    return;
  }

  if (typeof window !== 'undefined') {
    (window as any).apitable_i18n = {};
    (window as any).apitable_i18n[locale] = {};
  }else {
    (global as any).apitable_i18n = {};
    (global as any).apitable_i18n[locale] = {};
  }

  try {
    const strings = await import(`./config/strings.${locale}.json`);
    if (typeof window !== 'undefined') {
      Object.assign((window as any).apitable_i18n[locale], strings);
    }else {
      Object.assign((global as any).apitable_i18n[locale], strings);
    }
    return strings;
  } catch (error) {
    console.warn(`Failed to load strings for locale "${locale}"`, error);
    return {};
  }
}
