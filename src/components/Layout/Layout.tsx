import { useNavigate } from "react-router-dom"

import { LayoutWrapper, Header, LogoDiv, LogoName, LogoImg, NavigationContainer, Link, Main, NavigationMenu, NavigationMenuIconControl, Icon, Footer} from "./styles"

import { LayoutProps, PagesPaths } from "./types"
import logo from "assets/logo.png"
import Home from "pages/Home/Home"
import SignIn from "pages/SignIn/SignIn"
import SignUp from "pages/SignUp/SignUp"
import CreatePost from "pages/CreatePost/CreatePost"
import SignInForm from "components/SignInForm/SignInForm"
import PostCard from "components/PostCard/PostCard"

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()

  const goToHomePage = () => {
    navigate(PagesPaths.HOME)
  }
  
    return (
      <LayoutWrapper>
        <Header>
          <LogoDiv onClick={goToHomePage}>
            <LogoImg src={logo}></LogoImg>
            <LogoName>Help a hand</LogoName>
          </LogoDiv>
          <NavigationContainer>
          <Link
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
            })}
            to={PagesPaths.ALLPOSTS}
          >
            All Posts
          </Link>
          <Link
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
            })}
            to={PagesPaths.SIGNIN}
          >
            Sign In
          </Link>
          </NavigationContainer>
        </Header>
        <Main>
          {children}
          <NavigationMenu>
            Test
          </NavigationMenu>
          </Main>
        <Footer>
            <p>Legal Stuff</p>
            <p>-</p>
            <p>Privacy Policy</p>
            <p>-</p>
            <p>Security</p>
            <p>-</p>
            <p>Website Accessibility</p>
            <p>-</p>
            <p>Manage Cookies</p>
        </Footer>
      </LayoutWrapper>
    )
  }
  
  export default Layout
  