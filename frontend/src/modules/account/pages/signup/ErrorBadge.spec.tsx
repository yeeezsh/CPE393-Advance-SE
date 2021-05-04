import { shallow } from "enzyme";
import ErrorBadge from "./ErrorBadge";

describe("Pages/SignUp/ErrorBadge", () => {
  it("Should render component when statusError=400,500", () => {
    const wrap = shallow(<ErrorBadge statusError={400} />).text();
    expect(wrap).not.toBe("");
  });

  it("Should not render component when statusError=400,500", () => {
    const wrap = shallow(<ErrorBadge statusError={600} />).text();
    expect(wrap).toBe("");
  });
});
