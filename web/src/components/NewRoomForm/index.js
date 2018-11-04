import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const NewRoomForm = ({ handleSubmit, submitting, onSubmit }) => {
  const handleSubmitComp = data => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleSubmitComp)}>
      <div className="input-group">
        <Field
          name="name"
          type="text"
          placeholder="Name"
          component="input"
          className="form-control"
        />
        <div className="input-group-btn">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

NewRoomForm.defaultProps = {
  submitting: false,
};

NewRoomForm.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'newRoom',
  validate,
})(NewRoomForm);
