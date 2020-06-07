import Header from "./Header";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";

it("find number of links via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toBe(3);
});

it("find number of links via mount", () => {
  const numLinks = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  expect(numLinks).toBe(3);
});
