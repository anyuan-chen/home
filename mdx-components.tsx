import CaptionedImage from "@/components/ui/CaptionedImage";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: (props) => <CaptionedImage {...props} />,
    h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
    h2: (props) => (
      <h2 className="text-2xl font-bold text-gray-700" {...props} />
    ),
    h3: (props) => <h3 className="text-xl font-medium" {...props} />,
    code: (props) => <code className="bg-gray-500" {...props} />,
  };
}
