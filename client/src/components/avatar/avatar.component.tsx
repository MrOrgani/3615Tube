import React from "react";
// import { any } from "prop-types";

import "./avatar.styles.scss";
import image from "../../assets/images/avatar.png";
import { FieldProps } from "formik";

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   login: string;
//   email: string;
//   password: string;
//   avatar?: string;
// }

const Avatar: React.FC<FieldProps<any>> = (props: any) => {
  // const { values, setFieldValue, uploadImg } = props;
  const {
    field: { value },
    form: { setFieldValue },
    uploadImg
  } = props;
  console.log("values avatarm ", props);

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
            {/* <img src={""} alt="" id={"myimage"} className="image" /> */}
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
