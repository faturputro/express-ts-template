import dict from './locales';

export const locales = {
  'en-US': dict['en-US'],
  'id-ID': dict['id-ID'],
};

export type LocaleMap = typeof dict
export type LocaleName = keyof LocaleMap
export type Locale = LocaleMap[LocaleName]

export type DictPath<T extends Record<string, unknown>> = keyof {
  [K in keyof T as (
    T[K] extends string ?
      K :
      (T[K] extends Record<string, unknown> ?
        `${K & string}.${DictPath<T[K]> & string}` :
        never
  ))]: unknown
}
