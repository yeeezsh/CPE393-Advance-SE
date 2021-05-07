
import { shallow } from "enzyme";
import QuickNote from "./QuickNote";

import * as generateTypes from "../../../../common/services/generate/generate-types";

jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
}));

describe("Quicknote/QuickNote", () => {
  it("Should render successfully with default statusError=0", () => {
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

    jest.spyOn(generateTypes, "useCreateQuickNoteMutation").mockReturnValue([
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
    // shallow(<QuickNote onError={onError} />);
    expect(onError).toBeCalledWith(0);
  });
});