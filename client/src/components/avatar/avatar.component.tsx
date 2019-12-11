import React from "react";
// import { any } from "prop-types";

import "./avatar.styles.scss";
import image from "../../assets/images/avatar.png";

function Avatar(props: any) {
  const {
    //   field
    //   ,
    form
  } = props;
  const handleChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    const imgTag: any = document.getElementById("myimage");
    imgTag.title = file.name;
    reader.onload = function(event) {
      imgTag.src = event!.target!.result;
      form.setFieldValue("avatar", imgTag.src);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="avatar-container">
      {!form.values.avatar && (
        <>
          <input
            type={"file"}
            onChange={o => handleChange(o)}
            className={"form-control"}
            id="fileupload"
          />
          <label htmlFor="fileupload">
            <img src={image} className="image" alt="avatar" />
          </label>
        </>
      )}
      <img src={""} alt="" id={"myimage"} className="image" />
    </div>
  );
}

export default Avatar;
