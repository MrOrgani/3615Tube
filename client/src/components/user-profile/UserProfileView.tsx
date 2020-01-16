import React, { useContext } from "react";
import { FormikErrors } from "formik";
import image from "../../assets/images/avatar.png";
// import UserActivity from "../user-activity/user-activity.component";

import "./user-profile.styles.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid, Container, Typography, Divider } from "@material-ui/core";
import { UserContext } from "../context";
import ModifyMyProfileConnector from "./ModifyMyProfileConnector";

interface FormValues {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  avatar?: string;
}

interface Props {
  submit?: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  // onFinish?: () => void;
  userInfo?: any;
  userLogin?: any;
  loading?: boolean;
}

const SkeletonProfile = (
  <div className="user-profile-container">
    <Skeleton
      variant="circle"
      width={50}
      height={50}
      style={{ margin: "0 5px" }}
    />
    <Skeleton
      variant="text"
      height={10}
      width={"5em"}
      style={{ margin: "0 5px" }}
    />{" "}
    <Skeleton
      variant="text"
      height={10}
      width={"5em"}
      style={{ margin: "0 5px" }}
    />{" "}
    | 👤{" "}
    <Skeleton
      variant="text"
      height={10}
      width={"5em"}
      style={{ margin: "0 5px" }}
    />{" "}
    | ✉️{" "}
    <Skeleton
      variant="text"
      height={10}
      width={"5em"}
      style={{ margin: "0 5px" }}
    />
  </div>
);

const UserProfileView = ({ userInfo, loading }: Props) => {
  const { pathname } = window.location;
  const [myInfo] = useContext(UserContext) as any;
  const userInfoToDiplay = pathname === "/profile" ? myInfo : userInfo;

  return (
    <>
      {loading ? (
        SkeletonProfile
      ) : (
        <Container maxWidth="sm">
          <Grid
            container
            justify="center"
            direction="column"
            style={{ textAlign: "center" }}
            className="user-profile-container"
          >
            <Grid item>
              <Typography variant="h3">
                <span role="img" aria-label="avatar">
                  {userInfoToDiplay.login}
                </span>
              </Typography>
            </Grid>
            <Divider
              variant="middle"
              light
              style={{ margin: "10px 0", width: "inherit" }}
            />
            <img
              src={!userInfoToDiplay.avatar ? image : userInfoToDiplay.avatar}
              alt="MyAvatar"
              style={{
                borderRadius: "50%",
                width: "inherit",
                marginTop: "20px"
              }}
            />
            {/* </div> */}
            <Divider
              variant="middle"
              light
              style={{ margin: "10px 0", width: "inherit" }}
            />
            <Grid item>
              <Typography variant="h5">
                {`${userInfoToDiplay.firstName} ${userInfoToDiplay.lastName} `}
                {userInfoToDiplay.language === "fr" ? (
                  <span role="img" aria-label="france">
                    🇫🇷
                  </span>
                ) : (
                  <span role="img" aria-label="UK">
                    🇬🇧
                  </span>
                )}
              </Typography>
            </Grid>
            {pathname === "/profile" && (
              <>
                <Divider
                  variant="middle"
                  light
                  style={{ margin: "10px 0", width: "inherit" }}
                />
                <Grid item>{`✉️  ${userInfoToDiplay.email}`}</Grid>
                <Divider
                  variant="middle"
                  light
                  style={{ margin: "10px 0", width: "inherit" }}
                />
                <ModifyMyProfileConnector />
              </>
            )}
          </Grid>
        </Container>
      )}
      {/* <UserActivity userInfo={userInfo} /> */}
    </>
  );
};

export default UserProfileView;
