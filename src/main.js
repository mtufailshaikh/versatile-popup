import TTversatilePopup from './versatile-popup';
import Cookies from './cookies';


let ttPlugin = window.ttPlugin || {};

ttPlugin.versatileCard =  TTversatilePopup;
ttPlugin.Cookies =  Cookies;

window.ttPlugin = ttPlugin;
