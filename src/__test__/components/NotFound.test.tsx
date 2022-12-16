import "../../__mocks__/matchMedia";
import { NotFound } from "../../pages/notfound/NotFound";
import { renderWithProvidersAndNavigation } from "./CustomRender";

it("should render login screen properly", () => {
  const page = renderWithProvidersAndNavigation(<NotFound />);
  expect(page.asFragment()).toMatchSnapshot();
});
