export const formatTranscript = (transcript: string): string => {
  // Split the transcript into lines
  const lines = transcript.split('\n');

  // Format each line
  const formattedLines = lines.map((line) => {
    // Trim whitespace
    const trimmedLine = line.trim();

    // Capitalize the first letter
    const capitalizedLine = trimmedLine.charAt(0).toUpperCase() + trimmedLine.slice(1);

    return capitalizedLine;
  });

  // Join the formatted lines back into a single string
  return formattedLines.join('\n');
};
