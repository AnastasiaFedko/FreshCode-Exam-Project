import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const {
    fileUploadContainer, labelClass, fileNameClass, fileInput,
  } = classes;

  return (
    <Field name={rest.name}>
      {(props) => {
        const {
          field, form
        } = props;

        return (
          <div className={fileUploadContainer}>
            <label htmlFor="fileInput" className={labelClass}>
              Choose file
            </label>
            <span id="fileNameContainer" className={fileNameClass}>
              {''}
            </span>
            <input
              className={fileInput}
              id="fileInput"
              type="file"
              onChange={(e)=>{form.setFieldValue(rest.name, e.target.files[0])}}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
