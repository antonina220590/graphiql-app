import React from 'react';
import { render } from '@testing-library/react';

import Footer from './footer';

vi.mock('../../../public/github.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} data-testid="mock-github-icon">
      <text x="0" y="15">
        GitHub Icon Mock
      </text>
    </svg>
  ),
}));

vi.mock('../../../public/rss.svg', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} data-testid="mock-rss-icon">
      <text x="0" y="15">
        RSS Icon Mock
      </text>
    </svg>
  ),
}));

describe('Footer Component', () => {
  it('should render the footer with correct content and links', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<Footer />);

    expect(getByText('2024')).toBeInTheDocument();

    const rssLink = getByTestId('mock-rss-icon');
    expect(rssLink).toBeInTheDocument();
    expect(rssLink.closest('a')).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rssLink.closest('a')).toHaveAttribute('target', '_blank');

    const githubLinks = [
      'https://github.com/antonina220590',
      'https://github.com/inafk',
      'https://github.com/krkate',
    ];

    const githubIcons = getAllByTestId('mock-github-icon');
    expect(githubIcons).toHaveLength(githubLinks.length);

    githubLinks.forEach((link, index) => {
      const githubIcon = githubIcons[index];
      expect(githubIcon).toBeInTheDocument();
      expect(githubIcon.closest('a')).toHaveAttribute('href', link);
      expect(githubIcon.closest('a')).toHaveAttribute('target', '_blank');
    });
  });
});
