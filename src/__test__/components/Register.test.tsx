import "../../__mocks__/matchMedia";
import { Register } from "../../pages/register/Register";
import { renderWithProvidersAndNavigation } from "./CustomRender";

it("should render user registration screen properly", () => {
  const page = renderWithProvidersAndNavigation(<Register />);
  expect(page.asFragment()).toMatchSnapshot();
});
