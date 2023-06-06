import { ButtonComponent } from './button.component';

import { fireEvent, render, screen } from '@testing-library/angular';

describe('ButtonComponent', () => {
  test('create a button default (color = primary, variant = default)', async () => {
    await render(`<ctv-button>Button</ctv-button>`, {
      declarations: [ButtonComponent],
    });

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'ctv-button-primary',
      'ctv-button-variant-default'
    );
  });

  test('create a button secondary', async () => {
    await render(`<ctv-button color="secondary">Button</ctv-button>`, {
      declarations: [ButtonComponent],
    });

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'ctv-button-secondary',
      'ctv-button-variant-default'
    );
  });

  test(`if the button is clicked must emit a event`, async () => {
    const clicked = jest.fn();
    await render(ButtonComponent, {
      componentInputs: {
        ariaLabel: 'button',
      },
      componentOutputs: {
        onClick: {
          emit: clicked,
        } as any,
      },
    });

    const button = screen.getByRole('button', { name: 'button' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(clicked).toHaveBeenCalled();
  });

  test(`if the button is disabled doesn't emit button event`, async () => {
    const clicked = jest.fn();
    await render(ButtonComponent, {
      componentInputs: {
        disabled: true,
        ariaLabel: 'button',
      },
      componentOutputs: {
        onClick: {
          emit: clicked,
        } as any,
      },
    });

    const button = screen.getByRole('button', { name: 'button' });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(clicked).not.toHaveBeenCalled();
  });
});
