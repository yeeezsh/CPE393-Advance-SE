import { shallow } from "enzyme";
import HomePage from "./home";

describe("Pages/index", () => {
  it("Should match snapshots", () => {
    const wrap = shallow(<HomePage />);
    expect(wrap).toMatchSnapshot();
  });
});
