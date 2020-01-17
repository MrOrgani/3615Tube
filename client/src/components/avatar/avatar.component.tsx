import React from "react";
import { FieldProps } from "formik";
import image from "../../assets/images/avatar.png";

import "./avatar.styles.scss";
import { Container, Grid } from "@material-ui/core";

const Avatar: React.FC<FieldProps<any>> = (props: any) => {
  const {
    field: { value },
    form: { setFieldValue }
    // uploadImg
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
    // <div
    //   className="avatar-container"
    //   style={{ width: 50, height: 50, cursor: "pointer" }}
    // >
    <Container maxWidth="sm">
      <Grid
        container
        justify="center"
        direction="column"
        style={{ textAlign: "center" }}
        // className="user-profile-container"
      >
        <input
          type={"file"}
          onChange={o => handleChange(o)}
          className={"form-control"}
          style={{ display: "none" }}
          id="fileupload"
          accept="image/*"
        />
        <label
          htmlFor="fileupload"
          style={{
            // borderRadius: "50%",
            width: "inherit",
            // marginTop: "20px"
            cursor: "pointer"
          }}
        >
          <img
            src={value ? value : image}
            alt="MyAvatar"
            id={"myimage"}
            style={{
              borderRadius: "20px",
              width: "50%"
            }}
          />
        </label>
      </Grid>
    </Container>
  );
};

export default Avatar;
