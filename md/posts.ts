import dynamic from 'next/dynamic';

let Index = dynamic(() => import('./index.mdx'));
let Introduction = dynamic(() => import('./introduction.mdx'));

export default [{ Post: Index, id: 'index' }, { Post: Introduction, id: 'introduction' }];
