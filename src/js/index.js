import './../scss/main.scss';
// import webpackgif from '../images/webpack.gif';
import { Header } from './header';
import { Footer } from './../ts/footer';

let header = new Header();
let firstHeading = header.getFirstHeading();
console.log(firstHeading);

let footer = new Footer();
let footerText = footer.getFooterText();
console.log(footerText);

// setting the source of img
// document.getElementById('webpack-gif').setAttribute('src', webpackgif);