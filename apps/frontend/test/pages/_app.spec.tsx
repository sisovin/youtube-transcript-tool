import { render, screen } from '@testing-library/react';
import MyApp from '../../pages/_app';
import { setupMockYouTubeAPI } from '../../utils/mockYouTubeAPI';

jest.mock('../../utils/mockYouTubeAPI');

describe('MyApp', () => {
  beforeAll(() => {
    setupMockYouTubeAPI();
  });

  it('renders without crashing', () => {
    render(<MyApp Component={() => <div>Test Component</div>} pageProps={{}} />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('sets up YouTube API mocking', () => {
    expect(setupMockYouTubeAPI).toHaveBeenCalled();
  });
});
