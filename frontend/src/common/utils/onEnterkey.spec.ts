import onEnter from "./onEnterKey";

describe("Utils/onEnter", () => {
  it("Should fire when key === Enter", () => {
    const onCall = jest.fn();
    onEnter(onCall)({
      key: "Enter",
      currentTarget: {
        value: "Hello",
      },
    } as any);

    expect(onCall).toBeCalledWith("Hello");
  });

  it("Should not fire when key === Enter", () => {
    const onCall = jest.fn();
    const module = onEnter(onCall);
    module({
      key: "A",
    } as any);
    expect(onCall).not.toBeCalled();
  });
});
