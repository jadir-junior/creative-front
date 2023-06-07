import { ConfirmationService } from './confirmation.service';
import {
  fireEvent,
  queryByRole,
  render,
  screen,
  waitFor,
} from '@testing-library/angular';
import { ConfirmDialogModule } from './confirm-dialog.module';
import { ButtonModule } from '../button/button.module';
import { TestBed } from '@angular/core/testing';

describe('ConfirmDialogComponent', () => {
  const acceptSpy = jest.fn();
  const rejectSpy = jest.fn();

  const setup = async () =>
    render(
      `<div>
      <ctv-confirm-dialog></ctv-confirm-dialog>
      <ctv-button ariaLabel="btn-modal" (onClick)="openModal()">btn-modal</ctv-button>
    </div>`,
      {
        imports: [ConfirmDialogModule, ButtonModule],
        providers: [ConfirmationService],
        componentProperties: {
          openModal: () => {
            const cs = TestBed.inject(ConfirmationService);
            cs.confirm({
              message:
                'Are you sure that you want to delete this business unit? This action cannot be undone.',
              header: 'Confirmation',
              accept: () => acceptSpy(),
              reject: () => rejectSpy(),
            });
          },
        },
      }
    );

  test('open the modal', async () => {
    await setup();

    const buttonToOpenModal = screen.getByRole('button', { name: 'btn-modal' });
    expect(buttonToOpenModal).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(buttonToOpenModal);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirmation')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Are you sure that you want to delete this business unit? This action cannot be undone.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'acceptAriaLabel' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'rejectAriaLabel' })
    ).toBeInTheDocument();
  });

  test('open the modal and click in accept', async () => {
    await setup();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'acceptAriaLabel' }));

    expect(acceptSpy).toHaveBeenCalled();
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('open the modal and click in reject', async () => {
    await setup();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'rejectAriaLabel' }));

    expect(rejectSpy).toHaveBeenCalled();
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
