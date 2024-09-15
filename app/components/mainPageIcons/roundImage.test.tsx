import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import RoundImage from './roundImage';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    <img
      data-testid="round-image"
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  ),
}));

describe('RoundImage Component', () => {
  test('renders the Image with correct props', () => {
    const props = {
      src: 'https://example.com/image.jpg',
      alt: 'Example Image',
      width: 100,
      height: 100,
    };

    render(<RoundImage {...props} />);

    const imageElement = screen.getByTestId('round-image');

    expect(imageElement).toHaveAttribute('src', props.src);
    expect(imageElement).toHaveAttribute('alt', props.alt);
    expect(imageElement).toHaveAttribute('width', String(props.width));
    expect(imageElement).toHaveAttribute('height', String(props.height));
    expect(imageElement).toHaveClass('rounded-full');
  });
});
