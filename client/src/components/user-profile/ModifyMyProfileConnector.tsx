import React from "react";
// import MyProfileView from "./MyProfileView";
import ModifyMyProfileController from "../../controller/ModifyMyProfileController";
import ModifyMyProfileView from "./ModifyMyProfileView";

const ModifyMyProfileConnector = (props: any) => {
  return (
    <ModifyMyProfileController>
      {({ submit }) => <ModifyMyProfileView submit={submit} />}
    </ModifyMyProfileController>
  );
};

export default ModifyMyProfileConnector;
