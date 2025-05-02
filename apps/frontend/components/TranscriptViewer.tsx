import React, { useState } from 'react';

interface TranscriptViewerProps {
  transcript: string;
}

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcript }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setError('Failed to copy transcript.'));
  };

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <pre className="whitespace-pre-wrap">{transcript}</pre>
      <button onClick={handleCopy} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <button onClick={handleDownload} className="bg-green-500 text-white py-2 px-4 rounded mt-2 ml-2">
        Download
      </button>
    </div>
  );
};

export default TranscriptViewer;
