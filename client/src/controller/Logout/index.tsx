import { useMutation } from "react-apollo";
import gql from "graphql-tag";
// import { normalizeErrors } from "../../utils/normalizeErrors";
// import { async } from "q";

interface Props {
  children: (data: { logout: () => void }) => JSX.Element | null;
}

export const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

const LogoutController = (props: Props) => {
  const [mutate, { client }] = useMutation(logoutMutation);

  return props.children({
    logout: async () => {
      // await mutate();
      client!.clearStore().then(mutate as any);
      // client.resetStore();
    }
  });
};

export default LogoutController;
