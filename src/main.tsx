import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/Router.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Bounce, ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext.tsx";
import { CookiesProvider } from "react-cookie";
import { CartProvider } from "./context/CartContext.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <CookiesProvider>
                    <UserProvider>
                        <CartProvider>
                            <BrowserRouter>
                                <Router />
                                <ToastContainer
                                    position="top-right"
                                    autoClose={2000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    transition={Bounce}
                                    draggable
                                    pauseOnHover
                                    theme="dark"
                                />
                                <ToastContainer />
                            </BrowserRouter>
                        </CartProvider>
                    </UserProvider>
                </CookiesProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>
);
