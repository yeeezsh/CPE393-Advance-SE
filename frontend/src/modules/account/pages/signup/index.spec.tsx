import { shallow } from "enzyme";
import { GraphQLError } from "graphql/error/GraphQLError";
import AccountSignUpPage from ".";
import * as generateTypes from "../../../../common/services/generate/generate-types";
import { CreateAccountDocument } from "../../../../common/services/generate/generate-types";

describe("Page/Signup", () => {
  it("Should render successfully", () => {
    const mockFn: any = () => {};
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

    jest.spyOn(generateTypes, "useCreateAccountMutation").mockReturnValue([
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
    shallow(<AccountSignUpPage onError={onError} />);

    expect(onError).toBeCalledWith(400);
  });

  // it("Testtest", () => {
  //   const wrapper = shallow(<AccountSignUpPage />);

  //   expect(
  //     wrapper.contains(
  //       <Alert
  //         icon={<SmileOutlined />}
  //         message="Error"
  //         description="The Email or Username is used!"
  //         type="error"
  //         showIcon
  //       />
  //     )
  //   ).toEqual(false);
  // });
});
