import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Button from "../Button/Button";
import { StyledModal, StyledAlert, LayoutWrapper, Header, LogoDiv, LogoName, LogoImg, NavigationContainer, Link, ButtonControl, Main, IconControl, Icon, Footer, } from "./styles";
import { PagesPaths } from "./types";
import { alertSelectors, alertActions, } from "../../store/redux/AlertSlice/AlertSlice";
import { signInActions, signInSelectors, } from "../../store/redux/SignInFormSlice/SignInFormSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import myaccount from "../../assets/myaccount.png";
import myposts from "../../assets/myposts.png";
import newpost from "../../assets/createpost.png";
import logo from "../../assets/logo.png";
function Layout({ children }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedOn = useAppSelector(signInSelectors.isLoggedOn);
    const [modalOpen, setModalOpen] = useState(false);
    const isModalOpen = useAppSelector(alertSelectors.isOpen);
    const severity = useAppSelector(alertSelectors.severity);
    const message = useAppSelector(alertSelectors.cildren);
    useEffect(() => {
        if (isModalOpen) {
            setModalOpen(true);
            setTimeout(() => dispatch(alertActions.closeAlert()), 5000);
        }
        else {
            setModalOpen(false);
        }
    }, [isModalOpen]);
    const closeModal = () => {
        setModalOpen(false);
        dispatch(alertActions.closeAlert());
    };
    const goToHomePage = () => {
        navigate(PagesPaths.HOME);
    };
    const goToSignUp = () => {
        navigate("/signup");
    };
    const signOut = () => {
        dispatch(signInActions.logOut());
        navigate("/home");
    };
    return (_jsxs(LayoutWrapper, { children: [_jsx(StyledModal, { open: modalOpen, onClose: closeModal, children: _jsxs(StyledAlert, { severity: severity, children: [message, _jsx(IconButton, { onClick: closeModal, children: _jsx(CloseIcon, {}) })] }) }), _jsxs(Header, { children: [_jsxs(LogoDiv, { onClick: goToHomePage, children: [_jsx(LogoImg, { src: logo }), _jsx(LogoName, { children: "Help a hand" })] }), isLoggedOn ? (_jsxs(NavigationContainer, { children: [_jsx(Link, { style: ({ isActive }) => ({
                                    textDecoration: isActive ? "underline" : "none",
                                }), to: PagesPaths.ALLPOSTS, children: "All Posts" }), _jsxs(Link, { style: ({ isActive }) => ({
                                    textDecoration: isActive ? "underline" : "none",
                                }), to: PagesPaths.MYACCOUNT, children: [_jsx(IconControl, { children: _jsx(Icon, { src: myaccount }) }), _jsx("p", { children: "My Account" })] }), _jsxs(Link, { style: ({ isActive }) => ({
                                    textDecoration: isActive ? "underline" : "none",
                                }), to: PagesPaths.MYPOSTS, children: [_jsx(IconControl, { children: _jsx(Icon, { src: myposts }) }), "My Posts"] }), _jsxs(Link, { style: ({ isActive }) => ({
                                    textDecoration: isActive ? "underline" : "none",
                                }), to: PagesPaths.CREATEPOST, children: [_jsx(IconControl, { children: _jsx(Icon, { src: newpost }) }), "Create Post"] }), _jsx(ButtonControl, { children: _jsx(Button, { isRegularButton: true, onClick: signOut, children: "Sign Out" }) })] })) : (_jsxs(NavigationContainer, { children: [_jsx(Link, { style: ({ isActive }) => ({
                                    textDecoration: isActive ? "underline" : "none",
                                }), to: PagesPaths.ALLPOSTS, children: "All Posts" }), _jsx(Link, { style: ({ isActive }) => ({
                                    textDecoration: isActive ? "underline" : "none",
                                }), to: PagesPaths.SIGNIN, children: "Sign In" }), _jsx(ButtonControl, { children: _jsx(Button, { isRegularButton: true, onClick: goToSignUp, children: "Sign Up" }) })] }))] }), _jsx(Main, { children: children }), _jsxs(Footer, { children: [_jsx("p", { children: "Legal Stuff" }), _jsx("p", { children: "-" }), _jsx("p", { children: "Privacy Policy" }), _jsx("p", { children: "-" }), _jsx("p", { children: "Security" }), _jsx("p", { children: "-" }), _jsx("p", { children: "Website Accessibility" }), _jsx("p", { children: "-" }), _jsx("p", { children: "Manage Cookies" })] })] }));
}
export default Layout;
