import { NavigationContainer } from "@react-navigation/native";
import ContextProvider, { AuthContext } from "./context/contextProvider";

import PublicRoutes from "./routes/public";
import PrivateAdmin from "./routes/privateAdmin";
import PrivateUser from "./routes/privateUser";

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer independent={true}>
        <AuthContext.Consumer>
          {({ user, isAdmin }) => (
            <>
              {user ? (
                <>
                  <PrivateUser />
                  <PublicRoutes />
                  {isAdmin && (
                    <>
                      <PrivateAdmin />
                    </>
                  )}
                </>
              ) : (
                <PublicRoutes />
              )}
            </>
          )}
        </AuthContext.Consumer>
      </NavigationContainer>
    </ContextProvider>
  );
}
