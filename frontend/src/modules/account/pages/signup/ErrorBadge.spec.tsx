import { shallow } from "enzyme";
import ErrorBadge, {
  DuplicationAlert,
  UnexpectedErrorAlert,
} from "./ErrorBadge";

describe("Pages/SignUp/ErrorBadge", () => {
  it("Should render DuplicationAlert component when statusError=400", () => {
    const wrap = shallow(<ErrorBadge statusError={400} />);
    expect(wrap.find(DuplicationAlert).exists()).toBe(true);
    expect(wrap.find(UnexpectedErrorAlert).exists()).toBe(false);
  });

  it("Should render UnexpectedErrorAlert component when statusError=500", () => {
    const wrap = shallow(<ErrorBadge statusError={500} />);
    expect(wrap.find(UnexpectedErrorAlert).exists()).toBe(true);
    expect(wrap.find(DuplicationAlert).exists()).toBe(false);
  });

  it("Should not render component when statusError=400,500", () => {
    const wrap = shallow(<ErrorBadge statusError={600} />).text();
    expect(wrap).toBe("");
  });
});
