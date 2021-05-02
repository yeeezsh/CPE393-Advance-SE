import { shallow } from "enzyme";
import AccountBadge, { AccountBadgeProps } from ".";
import Overlay from "./overlay";
import { AccountBadgeStyle } from "./styled";

const MOCK_BADGE_PROPS: AccountBadgeProps = {
  username: "john",
  email: "john@doe.com",
  displayname: "john doe",
};

describe("Components/AccountBadge", () => {
  it("Should show overlay when clicked", () => {
    const wrap = shallow(<AccountBadge {...MOCK_BADGE_PROPS} />);
    const badge = wrap.find(AccountBadgeStyle);
    badge.simulate("click");
    expect(wrap.find(Overlay).exists()).toBe(true);
  });

  it("Should not show overlay when clicked", () => {
    const wrap = shallow(<AccountBadge {...MOCK_BADGE_PROPS} />);
    expect(wrap.find(Overlay).exists()).toBe(false);
  });
});
