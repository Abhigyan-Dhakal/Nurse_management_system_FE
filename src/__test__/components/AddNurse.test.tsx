import "../../__mocks__/matchMedia";
import { AddNurse } from "../../pages/add-nurse/AddNurse";
import { renderWithProvidersAndNavigation } from "./CustomRender";

it("should render adding nurse details screen properly", () => {
  const page = renderWithProvidersAndNavigation(<AddNurse />);
  expect(page.asFragment()).toMatchSnapshot();
});
