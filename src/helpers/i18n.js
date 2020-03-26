import locales from "../locales/locales.json";

export default function translate(value) {
  return value.split(".").reduce((previous, current) => {
    const translation = previous ? previous[current] : null;
    return translation !== undefined
      ? translation
      : `Missing translation for ${value}`;
  }, locales);
}
