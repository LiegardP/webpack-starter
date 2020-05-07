import './../scss/main.scss';
import './../css/style.css';
import { Header } from './header';
import { Footer } from './../ts/footer';

let header = new Header();
let firstHeading = header.getHeaderText();
console.log(firstHeading);

let footer = new Footer();
let footerText = footer.getFooterText();
console.log(footerText);

