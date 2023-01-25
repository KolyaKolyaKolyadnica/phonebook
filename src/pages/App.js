import { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { fetchCurrentUser } from 'redux/auth/auth-options';
import style from './App.module.css';

// Pages and Components
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute/PublicRoute';
import Modal from 'components/Modal';
const Navigation = lazy(() => import('../components/Navigation/Navigation'));
const HomePage = lazy(() => import('./HomePage/HomePage'));
const PhonebookPage = lazy(() => import('./PhonebookPage/PhonebookPage'));
const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./RegisterPage/RegisterPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useDispatch();
  const isFetchCurrentUser = useSelector(
    state => state.auth.isFetchCurrentUser
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <Suspense
      fallback={
        <Modal>
          <h1>Loading...</h1>
        </Modal>
      }
    >
      <div className={style.wrapper}>
        <div className={style.container}>
          <Routes>
            <Route path="/" element={<Navigation />}>
              {!isFetchCurrentUser ? (
                <>
                  <Route
                    index
                    path="/"
                    element={
                      <PublicRoute>
                        <HomePage />
                      </PublicRoute>
                    }
                  ></Route>

                  <Route
                    path="contacts"
                    element={
                      <PrivateRoute>
                        <PhonebookPage />
                      </PrivateRoute>
                    }
                  ></Route>

                  <Route
                    path="login"
                    element={
                      <PublicRoute restricted>
                        <LoginPage />
                      </PublicRoute>
                    }
                  ></Route>
                  <Route
                    path="register"
                    element={
                      <PublicRoute restricted>
                        <RegisterPage />
                      </PublicRoute>
                    }
                  ></Route>

                  <Route path="*" element={<NotFoundPage />}></Route>
                </>
              ) : (
                <>Smth wrong!</>
              )}
            </Route>
          </Routes>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
