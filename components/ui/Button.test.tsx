import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '@/lib/test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    renderWithProviders(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with primary variant by default', () => {
    renderWithProviders(<Button>Primary</Button>);
    const button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('bg-blue-600');
  });

  it('renders with secondary variant', () => {
    renderWithProviders(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-gray-200');
  });

  it('renders with danger variant', () => {
    renderWithProviders(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('bg-red-600');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const { user } = renderWithProviders(
      <Button onClick={handleClick}>Click me</Button>
    );
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithProviders(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    renderWithProviders(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender } = renderWithProviders(<Button size="sm">Small</Button>);
    let button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('px-3', 'py-1.5');

    rerender(<Button size="md">Medium</Button>);
    button = screen.getByRole('button', { name: /medium/i });
    expect(button).toHaveClass('px-4', 'py-2');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('px-6', 'py-3');
  });
});
