import renderer from "react-test-renderer";
import HomePage from "./home";

describe("Pages/index", () => {
  it("Should match snapshots", () => {
    const wrap = renderer.create(<HomePage />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});
