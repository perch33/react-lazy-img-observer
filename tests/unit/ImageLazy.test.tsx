import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ImageLazy from '../../src/ImageLazy';

describe('ImageLazy Component', () => {
  let observerCallback: IntersectionObserverCallback;
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    unobserveMock = vi.fn();

    // Mock IntersectionObserver to capture the callback
    vi.stubGlobal(
      'IntersectionObserver',
      class IntersectionObserver {
        constructor(cb: IntersectionObserverCallback) {
          observerCallback = cb;
        }
        observe = observeMock;
        disconnect = disconnectMock;
        unobserve = unobserveMock;
        takeRecords = vi.fn();
        root = null;
        rootMargin = '';
        thresholds = [];
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not render image initially (lazy load)', () => {
    render(<ImageLazy src="image.jpg" alt="test image" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute('src');
    expect(observeMock).toHaveBeenCalled();
  });

  it('should render image immediately when visibleByDefault is true', () => {
    render(<ImageLazy src="image.jpg" alt="test image" visibleByDefault />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'image.jpg');
  });

  it('should render image when it intersects with viewport', () => {
    render(<ImageLazy src="image.jpg" alt="test image" />);
    
    // Simulate intersection
    act(() => {
      if (observerCallback) {
        observerCallback(
          [
            {
              isIntersecting: true,
              target: document.createElement('div'), // dummy target
              intersectionRatio: 1,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
              time: Date.now(),
            },
          ],
          {} as IntersectionObserver
        );
      }
    });

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'image.jpg');
    expect(unobserveMock).toHaveBeenCalled();
  });

  it('should show loading component while loading', () => {
    render(
      <ImageLazy
        src="image.jpg"
        alt="test image"
        loadingComponent={<div data-testid="spinner">Loading...</div>}
      />
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should use fallbackSrc on error', () => {
    render(<ImageLazy src="image.jpg" alt="test image" fallbackSrc="fallback.jpg" visibleByDefault />);
    
    const img = screen.getByRole('img');
    fireEvent.error(img); // Simulate error

    expect(img).toHaveAttribute('src', 'fallback.jpg');
  });
});
