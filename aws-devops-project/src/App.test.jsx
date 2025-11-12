import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main title", () => {
  render(<App />);
  expect(screen.getByText(/2048 Game/i)).toBeInTheDocument();
});
