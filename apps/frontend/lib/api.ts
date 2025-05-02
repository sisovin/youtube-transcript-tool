import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchTranscript = async (videoId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transcripts/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};
