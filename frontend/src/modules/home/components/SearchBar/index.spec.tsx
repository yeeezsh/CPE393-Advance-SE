import { shallow } from "enzyme";
import { Searchbar } from "./index";

jest.mock("react-redux", () => ({
  useSelector: () => jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe("Components/Searchbar", () => {
  it("Search should call onSearch when pressing enter", () => {
    const onSearch = jest.fn();
    const wrap = shallow(<Searchbar />);

    wrap.simulate("keypress", {
      key: "Enter",
      currentTarget: { value: "Hello" },
    });
    expect(onSearch).toBeCalledWith("Hello");
  });
});
