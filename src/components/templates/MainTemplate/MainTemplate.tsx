import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidenav from "../../organisms/Sidenav/Sidenav";

const MainTemplate: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
     
    return (
        !isMobile
            ?
                // <Container >
                    <Sidenav />
                // </Container>
            :
                <>
                    <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }} >
                        {/* <TopBar />
                        <Outlet />
                        <AvatarDid />
                        <ScrollRestoration /> */}
                    </Container>
                    {/* <BottomBar /> */}
                </>
    );
};

export default MainTemplate;