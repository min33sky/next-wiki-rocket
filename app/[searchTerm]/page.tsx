import getWikiResults from '@/lib/getWikiResults';
import React from 'react';
import Item from './components/Item';
import { Metadata } from 'next';

interface Props {
  params: {
    searchTerm: string;
  };
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: SearchResult = await getWikiResults(searchTerm);

  const results = wikiData.query?.pages;
  const displayTerm = searchTerm.replaceAll('%20', ' ');

  if (!results) {
    return {
      title: `${displayTerm} is not a valid search term.`,
      description: `${displayTerm} is not a valid search term.`,
    };
  }

  const metadata: Metadata = {
    title: `Search results for ${displayTerm}`,
    description: `Search results for ${displayTerm}`,
  };

  return metadata;
}

export default async function page({ params: { searchTerm } }: Props) {
  const wikiData: SearchResult = await getWikiResults(searchTerm);

  const results = wikiData.query?.pages;

  if (!results) {
    return (
      <h2 className=" p-2 text-xl text-white ">{`${searchTerm} is not a valid search term.`}</h2>
    );
  }

  return (
    <main className=" bg-slate-200 mx-auto max-w-lg py-1 min-h-screen ">
      {Object.values(results).map((result) => (
        <Item key={result.pageid} result={result} />
      ))}
    </main>
  );
}
