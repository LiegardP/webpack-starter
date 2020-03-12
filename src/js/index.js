import './../css/style.css';
import './../scss/main.scss';
import { Header } from './header';
import { Footer } from './../ts/footer';

let header = new Header();
let firstHeading = header.getFirstHeading();
console.log(firstHeading);

let footer = new Footer();
let footerText = footer.getFooterText();
console.log(footerText);