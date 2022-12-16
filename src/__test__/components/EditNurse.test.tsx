import "../../__mocks__/matchMedia";
import { EditNurse } from "../../pages/edit-nurse/EditNurse";
import { renderWithProvidersAndNavigation } from "./CustomRender";

it("should render editing nurse details screen properly", () => {
  const page = renderWithProvidersAndNavigation(<EditNurse />);
  expect(page.asFragment()).toMatchSnapshot();
});
