import React from 'react'
import Markdown from 'react-markdown';
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import style from "./MarkdownViewer.module.css";

export default function MarkdownViewer({mdData}) {
  return (
    <Markdown
    rehypePlugins={[rehypeRaw]}
    remarkPlugins={[gfm]}
    skipHtml
    className={style.md}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");

        return !inline && match ? (
          <SyntaxHighlighter
            style={dracula}
            PreTag="div"
            language={match[1]}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  >
    {mdData}
  </Markdown>
  )
}
