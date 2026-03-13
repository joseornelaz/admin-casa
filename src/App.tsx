import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './hooks';

const App: React.FC = () => {    
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type === 'AUTH_TOKEN' && event.data.token) {
                // TODO: Add origin check for security in production
                // if (event.origin !== "EXPECTED_ORIGIN") return;
                
                console.log("Received token from iframe message");
                loginWithToken(event.data.token);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [loginWithToken]);

    return <Outlet />;
}

export default App;
