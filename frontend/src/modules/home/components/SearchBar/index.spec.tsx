import { shallow } from "enzyme";
import { Searchbar } from "./index";

describe("Components/Searchbar", () => {
  it("Search should call onSearch when pressing enter", () => {
    const onSearch = jest.fn();
    const wrap = shallow(<Searchbar onSearch={onSearch} />);

    wrap.simulate("keypress", {
      key: "Enter",
      currentTarget: { value: "Hello" },
    });
    expect(onSearch).toBeCalledWith("Hello");
  });
});
