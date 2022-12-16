import "../../__mocks__/matchMedia";
import { Login } from "../../pages/login/Login";
import { renderWithProvidersAndNavigation } from "./CustomRender";

it("should render login screen properly", () => {
  const page = renderWithProvidersAndNavigation(<Login />);
  expect(page.asFragment()).toMatchSnapshot();
});
