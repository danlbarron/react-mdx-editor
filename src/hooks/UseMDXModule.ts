import type { MDXModule } from 'mdx/types';

import { run } from '@mdx-js/mdx';
import * as jsxRuntime from 'react/jsx-runtime';
import { useMDXComponents } from '@mdx-js/react';

import { useEffect, useState } from "react";

export default function useMDXModule(code: string): MDXModule | undefined {
    const [module, setModule] = useState<MDXModule>();

    useEffect(() => {
        (async () => {
            setModule(await run(
                code,
                {
                    ...jsxRuntime,
                    useMDXComponents,
                }));
        })();
    }, [code])

    return module;
}