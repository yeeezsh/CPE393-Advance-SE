import { shallow } from "enzyme";
import { GraphQLError } from "graphql/error/GraphQLError";
import AccountSignUpPage from ".";
import * as generateTypes from "../../../../common/services/generate/generate-types";
import { CreateAccountDocument } from "../../../../common/services/generate/generate-types";

describe("Page/Signup", () => {
  const mocksError = [
    {
      request: {
        query: CreateAccountDocument,
        variables: {
          displayName: "blablabla",
          username: "blablabla",
          email: "note@mail.com",
          password: "123456",
        },
      },
      result: { errors: [new GraphQLError("Duplicated keys: email,username")] },
    },
  ];

  //   it("Should render error when graphql return error", async () => {
  //     const { findByText, getByText } = render(
  //       <MockedProvider mocks={mocksError} addTypename={false}>
  //         <AccountSignUpPage />
  //       </MockedProvider>
  //     );
  //     // console.log(wrapper.debug());
  // // expect(getByText('The Email or Username is used!')).toBeInTheDocument();
  // const errorAlert = await findByText("noError");
  // expect(errorAlert).toBeInTheDocument();
  // console.log(wrapper.html());
  // expect(wrapper.contains(<div className="errorMessage400"></div>)).toEqual(
  //   true
  // );
  // expect(wrapper.contains(<div className="normalDiv"></div>)).toEqual(false);
  // expect(
  //   wrapper.contains(
  //     <Alert
  //       icon={<SmileOutlined />}
  //       message="Error"
  //       description="The Email or Username is used!"
  //       type="error"
  //       showIcon
  //     />
  //   )
  // ).toEqual(true);
  // });

  // it("should match snapshot", () => {
  //   const wrap = renderer.create(<AccountSignUpPage />).toJSON();
  //   expect(wrap).toMatchSnapshot();
  // });

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
