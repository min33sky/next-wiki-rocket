/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

interface Props {
  result: Result;
}

export default function Item({
  result: { pageid, extract, title, thumbnail },
}: Props) {
  const itemTextCol = (
    <div className="flex flex-col justify-center">
      <h2>
        <Link
          href={`https://en.wikipedia.org/?curid=${pageid}`}
          target="_blank"
          className="text-xl font-bold underline"
        >
          {title}
        </Link>
      </h2>
      <p>{extract}</p>
    </div>
  );

  if (thumbnail?.source) {
    return (
      <article className="m-4 max-w-lg">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col justify-center">
            <img
              src={thumbnail.source}
              alt={title}
              width={thumbnail.width}
              height={thumbnail.height}
              loading="lazy"
            />
          </div>
          {itemTextCol}
        </div>
      </article>
    );
  }

  return <article className="m-4 max-w-lg">{itemTextCol}</article>;
}
