import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';

export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

interface SearchProps {
  searchList: SearchItem[];
}

export default function Search({ searchList }: SearchProps) {
  const [inputVal, setInputVal] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useRef(
    new Fuse(searchList, {
      keys: ['title', 'description', 'tags'],
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.4,
    })
  );

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();

    // Check if url contains search query
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');
    if (searchParam) {
      setInputVal(searchParam);
    }
  }, []);

  useEffect(() => {
    if (inputVal.length > 0) {
      const results = fuse.current.search(inputVal);
      setSearchResults(results.map((r) => r.item));
    } else {
      setSearchResults([]);
    }
  }, [inputVal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  return (
    <div>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          ref={inputRef}
          className="block w-full rounded border border-skin-fill border-opacity-40 bg-skin-fill py-3 pl-10 pr-3 placeholder:italic placeholder:text-opacity-75 focus:border-skin-accent focus:outline-none text-skin-base"
          placeholder="Search for anything..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>

      {inputVal.length > 0 && (
        <div className="mt-8">
          <div className="text-sm opacity-80 mb-4">
            Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for '{inputVal}'
          </div>
          <ul>
            {searchResults.map((post) => (
              <li key={post.slug} className="my-6">
                <a
                  href={`/posts/${post.slug}`}
                  className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 hover:underline"
                >
                  <h3 className="text-lg font-medium">{post.title}</h3>
                </a>
                <div className="text-sm opacity-80 italic mt-0.5">
                  <time>{post.date}</time>
                </div>
                <p className="mt-1 text-skin-base opacity-90 text-sm">{post.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
