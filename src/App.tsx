import { useState } from 'react'

import { withErrorBoundary } from 'react-error-boundary';

import './App.css'
import GitHubLink from './components/GitHubLink';
import MDXEditor from './components/MDXEditor';
import MDXRenderer from './components/MDXRenderer';
import useAutoThemePrism from './hooks/UseAutoThemePrism';
import useIsDarkTheme from './hooks/UseIsDarkTheme';

export default function App() {
    useAutoThemePrism(useIsDarkTheme());

    const [mdx, setMdx] = useState<string | undefined>(
`## Hello World

I hope you're all doing well today!

\`\`\`js
const letsMeet = true;

if (letsMeet) {
    console.log('Hello!');
}
\`\`\`

<QuoteCard
    quote="Markdown with a splash of components!"
    author="Danl Barron"
    bio="DBarron Consulting, LLC" />`);

    const MDXRendererWithErrorBoundary = withErrorBoundary(MDXRenderer, { FallbackComponent: ({ error }) => <p>{error.message}</p> });

    return (
        <div className="text-black dark:text-white">
            <nav className="bg-gray-400 dark:bg-gray-600 w-full py-2 flex">
                <h1 className="ml-4 text-xl">React MDX Editor</h1>
                <div className="flex grow justify-end pr-4">
                    <GitHubLink url="https://github.com/danlbarron/react-mdx-editor" />
                </div>
            </nav>

            <div className="bg-gray-200 dark:bg-gray-800 container mx-auto lg:h-[80vh] grid grid-rows-2 grid-cols-none lg:grid-cols-2 lg:grid-rows-none">
                <div className="overflow-y-auto">
                    <MDXEditor
                        height="80vh"
                        value={mdx}
                        onChange={setMdx} />
                </div>
                <div className="overflow-scroll">
                    <section className='prose dark:prose-invert m-3'>
                        <MDXRendererWithErrorBoundary mdx={mdx} />
                    </section>
                </div>
            </div>

            <footer className="mt-4">
                <div className="text-center">
                    <p>Powered by <a href="https://github.com/danlbarron"><strong>Danl Barron</strong></a></p>
                    <p>2023</p>
                </div>
            </footer>
        </div>
    );
}