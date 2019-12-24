import { useEffect } from "react";

interface Props {
  logout: () => void;
  onFinish: () => void;
}

const LogoutExec = (props: Props) => {
  useEffect(() => {
    const LogingOut = () => {
      props.logout();
      props.onFinish();
    };
    LogingOut();
  }, [props]);

  return null;
};

export default LogoutExec;
