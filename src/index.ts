import twemoji from "twemoji";
import emojiRegex from "emoji-regex";
import { gemoji } from "gemoji";
import { h } from "hastscript";
import { findAndReplace } from "hast-util-find-and-replace";
import type { Root } from "hast";
import type { Plugin } from "unified";

const emojiRegexValue = emojiRegex();
const gemojiMap = new Map(gemoji.map((data) => [data.emoji, data]));

type RehypeTwemojiOptions = {
  format?: "svg" | "png";
  source?: string;
  className?: string;
  ignore?: string[];
  draggable?: boolean;
};

const defaultOptions: RehypeTwemojiOptions = {
  format: "svg",
  source: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest",
};

const rehypeTwemoji: Plugin<[RehypeTwemojiOptions?], Root> =
  (inputOptions) => (tree) => {
    const {
      format,
      source,
      className,
      ignore = [],
      draggable,
    } = Object.assign(defaultOptions, inputOptions);

    findAndReplace(tree, [
      [
        emojiRegexValue,
        (emoji: string) => {
          if (ignore.includes(emoji)) {
            return emoji;
          }

          const codePoint = twemoji.convert.toCodePoint(
            emoji.indexOf(String.fromCharCode(0x200d)) < 0
              ? emoji.replace(/\uFE0F/g, "")
              : emoji,
          );
          const size = format === "svg" ? "svg" : "72x72";
          const url = `${source}/assets/${size}/${codePoint}.${format}`;
          const description = gemojiMap.get(emoji)?.description ?? emoji;

          return h("img", {
            src: url,
            alt: emoji,
            "aria-label": description,
            "data-twemoji": "",
            ...(draggable !== undefined && { draggable: String(draggable) }),
            ...(className && { class: className }),
          });
        },
      ],
    ]);
  };

export { rehypeTwemoji };
export type { RehypeTwemojiOptions };
