import React, { useState } from 'react';
import classNames from 'classnames';
import { Field } from 'formik';

const ImageUpload = ({ classes, name }) => {
  const [src, setSrc] = useState();
  return (
    <Field name={name}>
      {(props) => {
        const { field, form } = props;
        const { uploadContainer, inputContainer, imgStyle, invisibleStyle } = classes;

        const onChange = (e) => {
          const file = e.target.files[0];
          const imageType = /image.*/;
          if (!file.type.match(imageType)) {
            e.target.value = '';
          } else {
            form.setFieldValue(name, file);
            const reader = new FileReader();
            reader.onload = () => {
              setSrc(reader.result);
            };
            reader.readAsDataURL(file);
          }
        };
        return (
          <div className={uploadContainer}>
            <div className={inputContainer}>
              <span>Support only images (*.png, *.gif, *.jpeg)</span>
              <input
                id="fileInput"
                type="file"
                name={name}
                accept=".jpg, .png, .jpeg"
                onChange={onChange}
              />
              <label htmlFor="fileInput">Chose file</label>
            </div>
            <img id="imagePreview" src={src} className={classNames({ [imgStyle]: !!field.value, [invisibleStyle]: !(!!field.value) })} />
          </div>
        );
      }}
    </Field>
  )
};

export default ImageUpload;
