import type { MDXComponents } from "mdx/types";

import QuoteCard from "./mdx/QuoteCard";
import useMDXContent from "../hooks/UseMDXContent";

export interface MDXRendererProps {
    mdx: string | undefined;
}

export default function MDXRenderer({ mdx }: MDXRendererProps) {
    const MDXContent = useMDXContent(mdx);

    const components: MDXComponents = {
        // img: ...,
        // h1: ...,
        QuoteCard
    };

    return (
        <MDXContent components={components} />
    );
}