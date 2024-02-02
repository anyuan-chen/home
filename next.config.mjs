import createMDX from "@next/mdx";
import rehypePrism from "rehype-prism-plus";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypePrism, rehypeKatex],
  },
});

export default withMDX(nextConfig);
