import { shallow } from "enzyme";
import AccountSignInPage from "./index";
import * as generateTypes from "../../../../common/services/generate/generate-types";

describe("Pages/SignIn", () => {
  it("Should render successfully", () => {
    const mockFn: any = () => {
      //this is intentional
    };
    const apollo: any = {};
    const error: any = {};

    const MOCK_GRAPQL_ERRORS: any = [
      {
        extensions: {
          exception: {
            status: 400,
          },
        },
      },
    ];

    jest.spyOn(generateTypes, "useUserLoginMutation").mockReturnValue([
      mockFn,
      {
        error: {
          graphQLErrors: MOCK_GRAPQL_ERRORS,
          ...error,
        },
        ...apollo,
      },
    ]);

    const onError = jest.fn();
    shallow(<AccountSignInPage onError={onError} />);

    expect(onError).toBeCalledWith(400);
  });
});
