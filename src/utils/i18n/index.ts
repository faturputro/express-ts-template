import { locales, Locale, LocaleName, DictPath } from './type';

const defaultLocale = 'en-US';

type TOptions = {
  lang?: LocaleName
  key: DictPath<Locale>
  values?: Record<string, string>
}

const get = (obj: Record<string, unknown>, path: Array<string>, idx = 0): string => {
  if (!obj) return '';

  const key = path[idx];
  if (!key) return '';

  const res = obj[key];
  if (!res) return '';

  if (typeof res === 'string') return res;

  return get(Object(res), path, idx + 1);
};

export const t = ({ key, lang, values }: TOptions): string => {
  const result = get(locales[lang ?? defaultLocale], key.split('.'));

  if (values) {
    return result.replace(/{(\w+)}/g, (match, prop) => values[prop] || match);
  }

  return result;
};
