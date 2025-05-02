import React, { useState } from 'react';
import { validateYouTubeUrl } from '../utils/youtubeValidation';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  fetchTranscript: () => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl, fetchTranscript }) => {
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (validateYouTubeUrl(newUrl)) {
      setError('');
    } else {
      setError('Invalid YouTube URL');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateYouTubeUrl(url)) {
      fetchTranscript();
    } else {
      setError('Invalid YouTube URL');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={url}
        onChange={handleChange}
        placeholder="Enter YouTube URL"
        className="border p-2 rounded w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
        Fetch Transcript
      </button>
    </form>
  );
};

export default UrlInput;
