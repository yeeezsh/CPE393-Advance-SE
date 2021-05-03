import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

// windows mock implemetation
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.fetch = jest.fn().mockResolvedValue({});
