import renderer from "react-test-renderer";
import HomePage from "./home";

jest.mock("react-redux", () => ({
  useSelector: () => jest.fn(),
}));

describe("Pages/index", () => {
  it("Should match snapshots", () => {
    const wrap = renderer.create(<HomePage />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});
