import { setToken } from '@/lib/rtk/slice/authSlice';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const router = useRouter();
        const token = useSelector((state: any) => {
            console.log(state)
            return state.auth.token
        });
        const dispatch = useDispatch();

        useEffect(() => {
            const authToken = getCookie('token');
            dispatch(setToken(authToken?.toString()));
        }, [dispatch]);

        useEffect(() => {
            debugger
            if (!token) {
                router.push('/login');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;