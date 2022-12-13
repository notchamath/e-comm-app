import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const NavigationContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    height: 70px;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 25px;
    background-color: white;
`

export const LogoContainer = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 70px;
`

export const NavLinksContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const NavLink =  styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`