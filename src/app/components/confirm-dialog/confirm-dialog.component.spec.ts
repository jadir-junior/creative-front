import { ConfirmationService } from './confirmation.service';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { ConfirmDialogModule } from './confirm-dialog.module';
import { ButtonModule } from '../button/button.module';
import { TestBed } from '@angular/core/testing';
import { ConfirmEventType } from './confirm-dialog.component';
import { CreativeTemplateModule } from '../../directives/creative-template/creative-template.module';

describe('ConfirmDialogComponent', () => {
  const acceptSpy = jest.fn();
  const rejectSpy = jest.fn();

  const setup = async (position = 'center') =>
    render(
      `<div>
          <ctv-confirm-dialog [position]="position"></ctv-confirm-dialog>
          <ctv-button ariaLabel="btn-modal" (onClick)="openModal()">btn-modal</ctv-button>
        </div>`,
      {
        imports: [ConfirmDialogModule, ButtonModule],
        providers: [ConfirmationService],
        componentProperties: {
          position: position,
          openModal: () => {
            const cs = TestBed.inject(ConfirmationService);
            cs.confirm({
              message:
                'Are you sure that you want to delete this business unit? This action cannot be undone.',
              header: 'Confirmation',
              accept: (event: ConfirmEventType) => acceptSpy(event),
              reject: (event: ConfirmEventType) => rejectSpy(event),
            });
          },
        },
      }
    );

  const setupModalWithFooter = async () =>
    render(
      `
      <div>
        <ctv-confirm-dialog #cd>
          <ng-template ctvTemplate="footer">
            <ctv-button ariaLabel="cancel" (onClick)="cd.reject()">Cancel</ctv-button>
            <ctv-button ariaLabel="delete" (onClick)="cd.accept()">Delete</ctv-button>
          </ng-template>
        </ctv-confirm-dialog>
        <ctv-button ariaLabel="btn-modal" (onClick)="openModal()">btn-modal</ctv-button>
      </div>
      `,
      {
        imports: [ConfirmDialogModule, ButtonModule, CreativeTemplateModule],
        providers: [ConfirmationService],
        componentProperties: {
          openModal: () => {
            const cs = TestBed.inject(ConfirmationService);
            cs.confirm({
              message:
                'Are you sure that you want to delete this business unit? This action cannot be undone.',
              header: 'Confirmation',
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
    expect(acceptSpy).toHaveBeenCalledWith(ConfirmEventType.ACCEPT);
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
    expect(rejectSpy).toHaveBeenCalledWith(ConfirmEventType.REJECT);
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('open the modal and click in close button on top', async () => {
    await setup();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'cancelAriaLabel' }));

    expect(rejectSpy).toHaveBeenCalled();
    expect(rejectSpy).toHaveBeenCalledWith(ConfirmEventType.CANCEL);
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('open the modal on position left', async () => {
    await setup('left');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-left');
  });

  test('open the modal on position right', async () => {
    await setup('right');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-right');
  });

  test('open the modal on position top', async () => {
    await setup('top');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-top');
  });

  test('open the modal on position bottom', async () => {
    await setup('bottom');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-bottom');
  });

  test('open the modal on position top-left', async () => {
    await setup('top-left');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-top-left');
  });

  test('open the modal on position bottom-left', async () => {
    await setup('bottom-left');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-bottom-left');
  });

  test('open the modal on position top-right', async () => {
    await setup('top-right');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-top-right');
  });

  test('open the modal on position bottom-right', async () => {
    await setup('bottom-right');

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveClass('ctv-dialog-bottom-right');
  });

  test('open the modal with custom footer', async () => {
    await setupModalWithFooter();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'btn-modal' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'acceptAriaLabel' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'rejectAriaLabel' })
    ).not.toBeInTheDocument();
  });
});
