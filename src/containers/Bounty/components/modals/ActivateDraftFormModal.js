import React from 'react';
import styles from './Modals.module.scss';
import { Modal, Button } from 'components';
import { Field, reduxForm } from 'redux-form';
import { BigNumber } from 'bignumber.js';
import { compose } from 'redux';
import { ModalFormReset } from 'hocs';
import normalizers from 'utils/normalizers';
import validators from 'utils/validators';
import { FormTextInput } from 'form-components';

const ActivateDraftFormModal = props => {
  const { onClose, minimumBalance, handleSubmit, tokenSymbol, visible } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        dismissable={true}
        onClose={onClose}
        visible={visible}
        fixed
        size="small"
      >
        <Modal.Header closable={true}>
          <Modal.Message>Activate your bounty</Modal.Message>
          <Modal.Description>
            Indicate an amount for your initial deposit to activate the bounty.
            <em>
              {' '}
              At minimum, your initial deposit must match your payout amount of
            </em>{' '}
            <strong
              className={styles.textHighlight}
            >{`${minimumBalance} ${tokenSymbol}.`}</strong>
          </Modal.Description>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Field
            name="balance"
            component={FormTextInput}
            label={`Deposit amount (${tokenSymbol}).`}
            normalize={normalizers.number}
            validate={[
              validators.required,
              balance => {
                if (BigNumber(balance, 10).isLessThan(minimumBalance)) {
                  return 'Deposit amount must at least match the payout amount.';
                }
              }
            ]}
            placeholder="Enter amount..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            margin
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
            buttonType="button"
          >
            Cancel
          </Button>
          <Button type="action">Activate</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default compose(
  reduxForm({
    form: 'activateDraft',
    destroyOnUnmount: false
  }),
  ModalFormReset
)(ActivateDraftFormModal);
