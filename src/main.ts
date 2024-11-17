import { setupConverter } from './converter.ts';
import main from './main.html?raw';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = main;

setupConverter();
