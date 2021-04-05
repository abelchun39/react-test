import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import StarWarsPage from "./pages/StarWarsPage";
import PeanutsPage from "./pages/PeanutsPage";
import './App.css';

import { ThemeProvider, createGlobalStyle } from "styled-components"
import SCLeftNavigation from "./components/SCLeftNavigation";
import * as routes from "./core/constants/routes";
import {determineTheme, determineValue} from "./core/utils/themeUtils";
import {connect} from "react-redux";
import SLThemeSelectorButton from "./components/SCThemeSelectorButton";
import SCContainer from "./components/layout/SCContainer";
import SCContent from "./components/layout/SCContent";
import SCLeftNav from "./components/layout/SCLeftNav";
import { Animation } from '@lottiefiles/lottie-js';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0 auto;
        background-color: ${props => props.theme.colors.bodyBgColor};
        color: ${props => props.theme.colors.baseTextColor};
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .flex-row {
          display: flex;
          flex-direction: row;
    }
    .flex-col {
          display: flex;
          flex-direction: column;
    }
    p {
        margin: 0;
    }
    svg {
        min-width: 48px;
    }
    ul {
        list-style: none;
    }
    .c_tabsSwitcher {
          min-width: 500px;
          max-width: 40%;
          margin: 0 auto;
    }
    
    .nav--is-hidden {
        display: none;
    }
    
    @media only screen and (max-width: 500px) {
        .c_tabsSwitcher {
            min-width: 210px;
            max-width: none;
            margin: 0;
        }
    }
`;

class App extends Component {
    componentDidMount () {
        async function loadAnimation() {
            // Create Lottie instance 
            // (you can also use Animation.fromJSON method if you already have the Lottie JSON loaded)
            const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');
            console.log('anim? ', anim)
            // Print some data of the animation
            console.log('Frame Rate', anim.frameRate);
            console.log('Number of Layers', anim.layers.length);
            // console.log(anim.getColors());
          
            // Manipulate animation
            anim.name = 'Woohoo';
            anim.width = 512;
            anim.height = 512;
          
            // Get the new JSON
            const woohooLottie = JSON.stringify(anim);
            console.log(woohooLottie);
        }
        loadAnimation()
    }
    
    render () {
        const navItems = [
            {id: 1, route: routes.STARWARS,   label: 'Star Wars'},
            {id: 2, route: routes.PEANUTS,  label: 'Peanuts'}
        ];


        const { selectedTheme } = this.props;
        const theme = determineTheme(determineValue(selectedTheme));
        
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <React.Fragment>
                        <GlobalStyle/>
                        <SCContainer>
                            <SCLeftNav>
                                <SLThemeSelectorButton />
                                <SCLeftNavigation stacked navItems={navItems} />
                            </SCLeftNav>
                            <SCContent>
                                <Route exact path="/" component={StarWarsPage} />
                                <Route path="/starwars" component={StarWarsPage} />
                                <Route path="/peanuts" component={PeanutsPage} />
                            </SCContent>
                        </SCContainer>
                    </React.Fragment>
                </Router>
            </ThemeProvider>
        )
    }
}


//export default App;

const mapStateToProps = (state) => ({
    selectedTheme: state.themeState.selectedTheme
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
