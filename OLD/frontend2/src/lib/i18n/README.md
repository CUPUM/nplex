# Internationalization (i18n)

## Locale

A locale is an internationalization code that specifies a `language` code, and optionally a `region`
code that specifies further the format of certain linguistic features (ex.: currencies, dates,
custom region-specific messages, etc.). Locales are thus formatted as `[language]-[REGION]`, common
examples are:

- `fr`: French
- `en`: English
- `en-CA`: English (Canada)
- `de-CH`: German (Switzerland)

## Anatomy of translations

Translations are designed as collections of locale-specific dictionnaries. Each dictionnary for a
set of translations should provide homo-morphic definitions. Messages can be namespaced at will, as
long as the general structure follows:

```ts
Translations: {
	[locale]: {
		[namespace /* or message key */]: {
			[messageKey]: 'Message string',
			[anotherMessageKey]: (name: string, count: PluralCount) => `Message with ${name} and count-specific ${plural({1: 'formatting', 'many': 'formattings'}, count)}`
		}
		// ...
	}
	// ...
}
```
