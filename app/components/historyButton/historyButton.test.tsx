import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import HistoryBtn from './historyButton';

describe('HistoryBtn Component', () => {
  it('should render a link with a button that has text "History"', () => {
    render(<HistoryBtn />);

    const buttonElement = screen.getByRole('button', { name: 'History' });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('History');
    expect(buttonElement).toHaveClass(
      'bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease'
    );

    const linkElement = buttonElement.closest('a');
    expect(linkElement).toHaveAttribute('href', '/history');
  });
});
