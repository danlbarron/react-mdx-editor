import type { CompileOptions } from "@mdx-js/mdx";
import type { MDXContent } from 'mdx/types';

import React, { useEffect, useState } from "react";
import useErrorDispatcher from "./UserErrorDispatcher";
import useMDXModule from "./UseMDXModule";

import rehypePrism from '@mapbox/rehype-prism';
import { compile } from '@mdx-js/mdx';

export default function useMDXContent(mdx: string | undefined): MDXContent {
    const [code, setCode] = useState('');
    const throwError = useErrorDispatcher();

    const mdxModule = useMDXModule(code);
    const MDXContent = mdxModule ? mdxModule.default : React.Fragment;

    useEffect(() => {
        const mdx2code = async (mdx: string) => {
            const compileOptions: CompileOptions = {
                rehypePlugins: [rehypePrism],
                outputFormat: 'function-body'
            };

            return String(await compile(mdx, compileOptions).then(m => m, throwError));
        }

        (async () => {
            setCode(await mdx2code(mdx ?? ''));
        })();
    }, [mdx]);

    return MDXContent as MDXContent;
}