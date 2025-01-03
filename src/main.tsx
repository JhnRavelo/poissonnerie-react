import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/FormContext.tsx";
import { StockProvider } from "./context/StockContext.tsx";
import { AchatProvider } from "./context/AchatContext.tsx";
import { HistoryProvider } from "./context/HistoryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <FormProvider>
      <StockProvider>
        <AchatProvider>
          <HistoryProvider>
            <App />
          </HistoryProvider>
        </AchatProvider>
      </StockProvider>
    </FormProvider>
  </BrowserRouter>
);
