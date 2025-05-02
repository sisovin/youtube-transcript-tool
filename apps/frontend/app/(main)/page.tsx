import React, { useState } from 'react';
import UrlInput from '../../components/UrlInput';
import TranscriptViewer from '../../components/TranscriptViewer';
import { fetchTranscript } from '../../lib/api';

const MainPage = () => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchTranscript = async () => {
    setLoading(true);
    setError('');
    try {
      const fetchedTranscript = await fetchTranscript(url);
      setTranscript(fetchedTranscript);
    } catch (err) {
      setError('Failed to fetch transcript. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Transcript Tool</h1>
      <UrlInput url={url} setUrl={setUrl} fetchTranscript={handleFetchTranscript} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {transcript && <TranscriptViewer transcript={transcript} />}
    </div>
  );
};

export default MainPage;
