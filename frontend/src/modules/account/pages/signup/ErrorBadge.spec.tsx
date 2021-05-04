import { shallow } from "enzyme";
import ErrorBadge, { DuplicationAlert, UnexptecErrorAlert } from "./ErrorBadge";

describe("Pages/SignUp/ErrorBadge", () => {
  it("Should render DuplicationAlert component when statusError=400", () => {
    const wrap = shallow(<ErrorBadge statusError={400} />);
    expect(wrap.find(DuplicationAlert).exists()).toBe(true);
    expect(wrap.find(UnexptecErrorAlert).exists()).toBe(false);
  });

  it("Should render UnexptecErrorAlert component when statusError=500", () => {
    const wrap = shallow(<ErrorBadge statusError={500} />);
    console.log(wrap);
    expect(wrap.find(UnexptecErrorAlert).exists()).toBe(true);
  });

  it("Should not render component when statusError=400,500", () => {
    const wrap = shallow(<ErrorBadge statusError={600} />).text();
    expect(wrap).toBe("");
  });
});
