import { motion, useAnimation, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  padding: 34px 59px;
  font-size: 14px;
  background-color: ${(props) => props.theme.black.deepDark};
  letter-spacing: -0.2px;
  /* word-spacing: -1px; */
  font-weight: 300;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  cursor: pointer;
  margin-right: 45px;
  width: 95px;
  height: 25px;
  /* fill: ${(props) => props.theme.red}; */
  color: ${(props) => props.theme.white.darker};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 25px;
`;

const Item = styled.li`
  margin-right: 18px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  svg {
    height: 25px;
  }
`;

const Location = styled(motion.div)`
  width: 105%;
  height: 1px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

const Input = styled(motion.input)`
  position: absolute;
  right: 0px;
  transform-origin: right center;
  width: 280px;
  height: 35px;
  padding: 10px 0 10px 40px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 1);
  background-color: ${(props) => props.theme.black.deepDark};
  outline: none;
  color: ${(props) => props.theme.white.lighter};
  z-index: -1;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const logoVar = {
  normal: {
    fill: "rgba(229, 16, 19, 1)",
  },
  active: {
    fill: ["rgba(229, 16, 19, 1)", "rgba(255, 255, 255, 1)", "rgba(229, 16, 19, 1)"],
    transition: {
      repeat: 3,
      duration: 1.8,
    },
  },
};

const locationVar = {
  initial: {
    scaleX: 1,
  },
  locate: {
    scaleX: [0.8, 1],
  },
};

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const navAnimation = useAnimation();
  const toggleSearch = () => setSearchOpen((prev) => !prev);
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get());
      if (scrollY.get() > 30) {
        navAnimation.start({
          backgroundColor: "rgba(0,0,0,1)",
        });
      } else {
        navAnimation.start({
          backgroundColor: "rgba(0,0,0,0.4)",
        });
      }
    });
  }, [scrollY, navAnimation]);
  return (
    <Nav initial={{ backgroundColor: "rgba(0,0,0,0.4)" }} animate={navAnimation}>
      <Col>
        <Link to="/">
          <Logo
            variants={logoVar}
            initial="normal"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
          >
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to="/">
              홈
              {homeMatch && (
                <Location
                  variants={locationVar}
                  initial="initial"
                  animate="locate"
                  layoutId="location"
                />
              )}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              시리즈{" "}
              {tvMatch && (
                <Location
                  variants={locationVar}
                  initial="initial"
                  animate="locate"
                  layoutId="location"
                />
              )}
            </Link>
          </Item>
          <Item>영화</Item>
          <Item>NEW! 요즘 대세 콘텐츠</Item>
          <Item>내가 찜한 콘텐츠</Item>
          <Item>언어별로 찾아보기</Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <motion.svg
            animate={{ x: searchOpen ? -245 : 0 }}
            onClick={toggleSearch}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            transition={{ type: "linear" }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            placeholder="제목, 사람, 장르"
          />
        </Search>
      </Col>
    </Nav>
  );
}
