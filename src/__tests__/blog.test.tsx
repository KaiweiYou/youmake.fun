import { render, screen } from '@testing-library/react';
import BlogPage from '../app/blog/page';

test('博客页面渲染', () => {
  render(<BlogPage />);
  expect(screen.getByText('博客')).toBeInTheDocument();
  expect(screen.getByText('Hello World')).toBeInTheDocument();
}); 