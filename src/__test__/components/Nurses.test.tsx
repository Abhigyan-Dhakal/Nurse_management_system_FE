import "../../__mocks__/matchMedia";
import { Nurses } from "../../pages/nurses/Nurses";
import { renderWithProvidersAndNavigation } from "./CustomRender";

export const nurseArray = [
  {
    nurse_id: 1,
    name: "Test Nurse",
    email: "nurseTest@gmail.com",
    photograph: "PhotoTest",
    workingDays: 12,
    dutyStartTime: "10AM",
    dutyEndTime: "5PM",
    isRoundingManager: true,
    address: "KamalPokhari",
    contact: "1234567890",
  },
];

it("should render nurse screen properly", () => {
  const page = renderWithProvidersAndNavigation(<Nurses />, {
    preloadedState: {
      nurseReducer: { data: nurseArray },
    },
  });
  expect(page.asFragment()).toMatchSnapshot();
});
