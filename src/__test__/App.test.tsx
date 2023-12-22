import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();


test("Render login Page", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
});


test("Render signup Page", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/signup"]}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });
  



