import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1 Load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // 2 If no authenticated user, redirect to login page
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [navigate, isLoading, isAuthenticated]
  );

  // 3 White loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4 If there is a user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
