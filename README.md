# Rehype Twemoji

A rehype plugin to convert emoji to twemoji.

## Install

```bash
pnpm i -D @yuna0x0/rehype-twemoji
```

## Usage

```ts
import { rehypeTwemoji } from 'rehype-twemoji'
import type { RehypeTwemojiOptions } from 'rehype-twemoji'

...

{
  rehypePlugins: [
    [rehypeTwemoji, {
      format: 'svg',
      source: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest',
      className: 'emoji',
      ignore: ['©', '®', '™', '℗', '↩'],
      draggable: false,
    } satisfies RehypeTwemojiOptions],
  ]
}
```

Input:

```md
Hello World 👋
```

Output:

```html
<p>
  Hello World
  <img
    src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f44b.svg"
    alt="👋"
    aria-label="waving hand"
    data-twemoji=""
    draggable="false"
    class="emoji"
  />
</p>
```

## Options

- `format`: `svg` or `png` (default: `svg`)
- `source`: source of twemoji (default: `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest`)
- `className`: CSS class name to apply to emoji images (optional)
- `ignore`: array of emoji characters to ignore and not convert to images (optional)
- `draggable`: whether emoji images are draggable (optional, browser default when not set)

## Styling

You can use `data-twemoji` attribute to style the emoji.

Here is an example of using with Tailwind CSS:

```css
[data-twemoji] {
  @apply size-[1.2em] inline-block align-text-bottom;
}
```

# License

MIT
