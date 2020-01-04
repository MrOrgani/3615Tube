import React from "react";
import { FieldProps } from "formik";
import image from "../../assets/images/avatar.png";

import "./avatar.styles.scss";

const Avatar: React.FC<FieldProps<any>> = (props: any) => {
  const {
    field: { value },
    form: { setFieldValue },
    uploadImg
  } = props;

  const handleChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    const imgTag: any = document.getElementById("myimage");
    if (file) {
      imgTag.title = file.name;
      reader.onload = function(event) {
        imgTag.src = event!.target!.result;
        setFieldValue("avatar", imgTag.src);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-container">
      {uploadImg ? (
        <>
          <input
            type={"file"}
            onChange={o => handleChange(o)}
            className={"form-control"}
            id="fileupload"
            accept="image/*"
          />
          <label htmlFor="fileupload">
            <img
              src={value ? value : image}
              id={"myimage"}
              className="image"
              alt="avatar"
            />
          </label>
        </>
      ) : (
        <img
          src={value ? value : image}
          id={"myimage"}
          className="image"
          alt="avatar"
        />
      )}
    </div>
  );
};

export default Avatar;
