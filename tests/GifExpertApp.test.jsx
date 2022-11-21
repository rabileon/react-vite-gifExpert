import { fireEvent, render, screen } from '@testing-library/react';
import { GifExpertApp } from '../src/GifExpertApp';

describe('Pruebas en <GifExpertApp />', () => {
  const setup = () => {
    render(<GifExpertApp />);
    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form', { name: 'form' });
    return {
      input,
      form,
    };
  };

  test('sould match the snapshot', () => {
    const { container } = render(<GifExpertApp />);
    expect(container).toMatchSnapshot();
  });

  test('Agregar categorias', () => {
    const { input, form } = setup();

    fireEvent.input(input, { target: { value: 'Dragon Ball' } });
    fireEvent.submit(form);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
  });

  test('No agregar categorias repetidas', () => {
    const { input, form } = setup();

    fireEvent.change(input, { target: { value: 'One Punch' } });
    fireEvent.submit(form);

    fireEvent.change(input, { target: { value: 'One Punch' } });
    fireEvent.submit(form);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
  });
});
